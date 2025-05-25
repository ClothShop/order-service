import mongoose, { Schema, Document } from 'mongoose';

interface Address {
    city: string;
    state: string;
    postalCode: string;
    country: string;
}

interface OrderItem {
    productId: string;
    productName: string;
    price: number;
    quantity: number;
    variant?: string;
}

export interface OrderDocument extends Document {
    userId: string;
    items: OrderItem[];
    subtotal: number;
    discount: number;
    total: number;
    promoCode?: string | null;
    status: 'pending' | 'processing' | 'shipped' | 'delivered' | 'cancelled';
    shippingAddress: Address;
    paymentMethod: string;
    createdAt: Date;
}

const AddressSchema = new Schema<Address>(
    {
        city: { type: String, required: true },
        state: { type: String, required: true },
        postalCode: { type: String, required: true },
        country: { type: String, required: true },
    },
    { _id: false }
);

const OrderItemSchema = new Schema<OrderItem>(
    {
        productId: { type: String, required: true },
        productName: { type: String, required: true },
        price: { type: Number, required: true },
        quantity: { type: Number, required: true },
    },
    { _id: false }
);

const OrderSchema = new Schema<OrderDocument>(
    {
        userId: { type: String, required: true },
        items: { type: [OrderItemSchema], required: true },
        subtotal: { type: Number, required: true },
        discount: { type: Number, required: true },
        total: { type: Number, required: true },
        promoCode: { type: String, default: null },
        status: {
            type: String,
            enum: ['pending', 'processing', 'shipped', 'delivered', 'cancelled'],
            default: 'pending',
        },
        shippingAddress: { type: AddressSchema, required: true },
        paymentMethod: { type: String, required: true },
        createdAt: { type: Date, default: Date.now },
    },
    { timestamps: true }
);

export default mongoose.model<OrderDocument>('Order', OrderSchema);