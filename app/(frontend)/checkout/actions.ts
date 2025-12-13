'use server'

import { getPayload } from 'payload'
import config from '@/payload.config'
import { CartItem } from '@/lib/store/cart-store'

export type OrderState = {
  success?: boolean
  error?: string
  orderId?: string
}

type CustomerDetails = {
    firstName: string
    lastName: string
    email: string
    phone: string
    address: string
    city: string
    postalCode: string
    province: string
}

export async function createOrder(
  prevState: OrderState,
  formData: FormData
): Promise<OrderState> {
  try {
    const payload = await getPayload({ config })
    
    const customerDetails: CustomerDetails = {
      firstName: formData.get('firstName') as string,
      lastName: formData.get('lastName') as string,
      email: formData.get('email') as string,
      phone: formData.get('phone') as string,
      address: formData.get('address') as string,
      city: formData.get('city') as string,
      postalCode: formData.get('postalCode') as string,
      province: formData.get('province') as string,
    }

    const shippingMethod = formData.get('shippingMethod') as 'pargo' | 'pep'
    const collectionPoint = formData.get('collectionPoint') as string
    const cartItemsJson = formData.get('cartItems') as string
    
    if (!cartItemsJson) {
        return { error: 'Cart is empty' }
    }

    const cartItems: CartItem[] = JSON.parse(cartItemsJson)

    if (cartItems.length === 0) {
      return { error: 'Cart is empty' }
    }

    // validate required fields
    if (!customerDetails.firstName || !customerDetails.lastName || !customerDetails.email) {
        return { error: 'Missing required fields' }
    }
    
    if (!collectionPoint) {
      return { error: 'Please specify a collection point' }
    }

    let shippingCost = 0
    if (shippingMethod === 'pargo') shippingCost = 100
    if (shippingMethod === 'pep') shippingCost = 80

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
