import { z } from 'zod';

const addressSchema = z.object({
    street: z.string(),
    city: z.string(),
    state: z.string(),
    postalCode: z.string(),
    country: z.string(),
});

const orderItemSchema = z.object({
    productId: z.string(),
    productName: z.string(),
    price: z.number(),
    quantity: z.number().int().positive(),
    variant: z.string().optional(),
});

export const createOrderSchema = z.object({
    userId: z.string(),
    items: z.array(orderItemSchema),
    subtotal: z.number(),
    discount: z.number(),
    total: z.number(),
    promoCode: z.string().nullable().optional(),
    status: z.enum(['pending', 'processing', 'shipped', 'delivered', 'cancelled']),
    shippingAddress: addressSchema,
    billingAddress: addressSchema,
    paymentMethod: z.string(),
});