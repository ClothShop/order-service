import { Request, Response } from 'express';
import Order from '../models/order.model';

export const createOrder = async (req: Request, res: Response) => {
    try {
        const order = new Order(req.body);
        if (req.user?.UserID) {
            order.userId = req.user.UserID;
        }
        const savedOrder = await order.save();
        res.status(201).json(savedOrder);
    } catch (error) {
        res.status(500).json({ message: 'Ошибка при создании заказа.', error });
    }
};

export const getOrders = async (req: Request, res: Response) => {
    try {
        const orders = await Order.find({ userId: req.user?.UserID });
        res.status(200).json(orders);
    } catch (error) {
        res.status(500).json({ message: 'Ошибка при получении заказов.', error });
    }
};

export const getOrderById = async (req: Request, res: Response) => {
    try {
        const order = await Order.find().where('userId').equals(req.user?.UserID);
        if (!order) return res.status(200).json({ message: 'Заказ не найден.', order: []});
        res.status(200).json(order);
    } catch (error) {
        res.status(500).json({ message: 'Ошибка при получении заказа.' });
    }
};

export const updateOrder = async (req: Request, res: Response) => {
    try {
        const updatedOrder = await Order.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!updatedOrder) return res.status(404).json({ message: 'Заказ не найден.' });
        res.status(200).json(updatedOrder);
    } catch (error) {
        res.status(500).json({ message: 'Ошибка при обновлении заказа.', error });
    }
};

export const deleteOrder = async (req: Request, res: Response) => {
    try {
        const deletedOrder = await Order.findByIdAndDelete(req.params.id);
        if (!deletedOrder) return res.status(404).json({ message: 'Заказ не найден.' });
        res.status(200).json({ message: 'Заказ удалён.' });
    } catch (error) {
        res.status(500).json({ message: 'Ошибка при обновлении заказа.', error });
    }
}