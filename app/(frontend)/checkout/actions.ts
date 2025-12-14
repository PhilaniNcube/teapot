'use server'

import { getPayload } from 'payload'
import config from '@/payload.config'
import { CartItem } from '@/lib/store/cart-store'

import { CheckoutSchema, checkoutSchema } from '@/lib/validators/checkout'

export type OrderState = {
  success?: boolean
  error?: string
  orderId?: string
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
      firstName, lastName, email, phone, address, city, postalCode, province
    }

    let shippingCost = 0
    if (shippingMethod === 'pep_standard') shippingCost = 60
    if (shippingMethod === 'pep_express') shippingCost = 120

    const itemsTotal = cartItems.reduce((acc, item) => acc + (item.price * item.quantity), 0)
    const total = itemsTotal + shippingCost

    const order = await payload.create({
      collection: 'orders',
      data: {
        customerDetails,
        shippingMethod,
        collectionPoint,
        shippingCost,
        items: cartItems.map(item => ({
          book: item.id,
          quantity: item.quantity,
          price: item.price
        })),
        total,
        status: 'pending',
      },
    })

    return { success: true, orderId: order.id.toString() }

  } catch (error) {
    console.error('Failed to create order:', error)
    return { error: 'Failed to create order. Please try again.' }
  }
}
