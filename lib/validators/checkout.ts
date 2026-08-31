import { z } from 'zod'

export const cartItemSchema = z.object({
  id: z.number(),
  title: z.string(),
  price: z.number(),
  quantity: z.number().min(1),
})

const addressFieldErrors = {
  address: 'Street address is required for home delivery',
  city: 'City is required for home delivery',
  postalCode: 'Postal code is required for home delivery',
  province: 'Province is required for home delivery',
} as const

export const checkoutSchema = z
  .object({
    firstName: z.string().min(2, 'First name must be at least 2 characters'),
    lastName: z.string().min(2, 'Last name must be at least 2 characters'),
    email: z.string().email('Please enter a valid email address'),
    phone: z.string().min(10, 'Please enter a valid phone number'),
    address: z.string().min(5, 'Address must be at least 5 characters').optional().or(z.literal('')),
    city: z.string().min(2, 'City is required').optional().or(z.literal('')),
    postalCode: z.string().min(4, 'Postal code is required').optional().or(z.literal('')),
    province: z.string().min(2, 'Province is required').optional().or(z.literal('')),
    shippingMethod: z.enum(['pep_standard', 'pep_express', 'home_delivery']),
    collectionPoint: z.string().min(2, 'Please specify a collection point').optional().or(z.literal('')),
    cartItems: z.array(cartItemSchema).min(1, 'Cart is empty'),
  })
  .superRefine((data, ctx) => {
    if (data.shippingMethod === 'home_delivery') {
      for (const [field, message] of Object.entries(addressFieldErrors) as [
        keyof typeof addressFieldErrors,
        string,
      ][]) {
        if (!data[field]?.trim()) {
          ctx.addIssue({
            code: z.ZodIssueCode.custom,
            path: [field],
            message,
          })
        }
      }
    } else if (!data.collectionPoint?.trim()) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        path: ['collectionPoint'],
        message: 'Please specify a collection point',
      })
    }
  })

export type CheckoutSchema = z.infer<typeof checkoutSchema>
