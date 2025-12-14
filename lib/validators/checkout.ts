import { z } from 'zod'

export const cartItemSchema = z.object({
  id: z.number(),
  title: z.string(),
  price: z.number(),
  quantity: z.number().min(1),
})

export const checkoutSchema = z.object({
  firstName: z.string().min(2, 'First name must be at least 2 characters'),
  lastName: z.string().min(2, 'Last name must be at least 2 characters'),
  email: z.string().email('Please enter a valid email address'),
  phone: z.string().min(10, 'Please enter a valid phone number'),
  address: z.string().min(5, 'Address must be at least 5 characters'),
  city: z.string().min(2, 'City is required'),
  postalCode: z.string().min(4, 'Postal code is required'),
  province: z.string().min(2, 'Province is required'),
  shippingMethod: z.enum(['pep_standard', 'pep_express']),
  collectionPoint: z.string().min(2, 'Please specify a collection point'),
  cartItems: z.array(cartItemSchema).min(1, 'Cart is empty'),
})

export type CheckoutSchema = z.infer<typeof checkoutSchema>
