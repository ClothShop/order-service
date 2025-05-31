import express from 'express'
import {createOrder, deleteOrder, getMyOrders, getOrders, updateOrder, getUserOrders, getOrderById} from '../controllers/order.controller';
import {authenticateJWT, authorizeAdmin} from "../middlewares/auth.middleware";
import {validateBody} from "../middlewares/validate.middleware";
import {OrderSchema} from "../dto/order.dto";

const router = express.Router();

// @ts-ignore
router.get('/', authenticateJWT, authorizeAdmin, getOrders);
// @ts-ignore
router.get('/me', authenticateJWT, getMyOrders);
// @ts-ignore
router.get('/:id', authenticateJWT, authorizeAdmin, getOrderById);
// @ts-ignore
router.get('/user/:id', authenticateJWT, authorizeAdmin, getUserOrders);
// @ts-ignore
router.post('/', authenticateJWT, validateBody(OrderSchema), createOrder);
// @ts-ignore
router.put('/:id', authenticateJWT, validateBody(OrderSchema.partial()), updateOrder);
// @ts-ignore
router.delete('/:id', authenticateJWT, deleteOrder);

export default router;