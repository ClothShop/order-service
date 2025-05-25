import { z } from "zod";

export const OrderItemSchema = z.object({
    productId: z.string(),
    productName: z.string(),
    quantity: z.number().min(1),
    price: z.number().min(0),
});

export const AddressSchema = z.object({
    city: z.string(),
    state: z.string(),
    postalCode: z.string(),
    country: z.string(),
});

export const OrderSchema = z.object({
    items: z.array(OrderItemSchema).min(1),
    subtotal: z.number(),
    discount: z.number(),
    total: z.number(),
    promoCode: z.string().nullable().optional(),
    status: z.enum(['pending', 'processing', 'shipped', 'delivered', 'cancelled']).default('pending'),
    shippingAddress: AddressSchema,
    paymentMethod: z.string()
});