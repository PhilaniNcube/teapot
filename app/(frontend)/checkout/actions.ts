'use server'

import { headers } from 'next/headers'
import { getPayload } from 'payload'
import config from '@/payload.config'
import { CheckoutSchema, checkoutSchema } from '@/lib/validators/checkout'
import { buildPayfastFormData } from '@/lib/payfast'

export type OrderState = {
  success?: boolean
  error?: string
  orderId?: string
  payfastUrl?: string
  payfastFields?: Record<string, string>
  errors?: Record<string, string[]>
}

export async function createOrder(
  prevState: OrderState,
  data: CheckoutSchema
): Promise<OrderState> {
  try {
    const payload = await getPayload({ config })
    
    // Validate with Zod
    const validatedFields = checkoutSchema.safeParse(data)

    if (!validatedFields.success) {
      return {
        error: 'Please fix the errors in the form',
        errors: validatedFields.error.flatten().fieldErrors
      }
    }

    const { 
      firstName, lastName, email, phone, address, city, postalCode, province,
      shippingMethod, collectionPoint, cartItems 
    } = validatedFields.data

    const customerDetails = {
      firstName,
      lastName,
      email,
      phone,
      ...(address ? { address } : {}),
      ...(city ? { city } : {}),
      ...(postalCode ? { postalCode } : {}),
      ...(province ? { province } : {}),
    }

    let shippingCost = 0
    if (shippingMethod === 'pep_standard') shippingCost = 60
    if (shippingMethod === 'pep_express') shippingCost = 120
    if (shippingMethod === 'home_delivery') shippingCost = 120

    const itemsTotal = cartItems.reduce((acc, item) => acc + (item.price * item.quantity), 0)
    const total = itemsTotal + shippingCost

    const order = await payload.create({
      collection: 'orders',
      data: {
        customerDetails,
        shippingMethod,
        ...(collectionPoint ? { collectionPoint } : {}),
        shippingCost,
        items: cartItems.map(item => ({
          book: item.id,
          quantity: item.quantity,
          price: item.price
        })),
        total,
        status: 'pending',
        paymentStatus: 'unpaid',
        paymentMethod: 'payfast',
      },
    })

    // Determine Base URL for callbacks
    const headerList = await headers()
    const host = headerList.get('host') || 'localhost:3000'
    const proto = headerList.get('x-forwarded-proto') || 'http'
    const baseUrl = process.env.NEXT_PUBLIC_APP_URL || `${proto}://${host}`

    const itemName = `Teapot Publishing Order #${order.id}`

    const payfastData = buildPayfastFormData({
      orderId: order.id.toString(),
      amount: total,
      itemName,
      firstName,
      lastName,
      email,
      baseUrl,
    })

    return {
      success: true,
      orderId: order.id.toString(),
      payfastUrl: payfastData.actionUrl,
      payfastFields: payfastData.fields,
    }

  } catch (error) {
    console.error('Failed to create order:', error)
    return { error: 'Failed to create order. Please try again.' }
  }
}
