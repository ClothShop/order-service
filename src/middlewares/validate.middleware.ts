import { Request, Response, NextFunction } from 'express';
import {ZodSchema} from "zod";

export const validateBody = (schema: ZodSchema) => (req: Request, res: Response, next: NextFunction) => {
    try {
        req.body = schema.parse(req.body);
        next();
    } catch (error: any) {
        return res.status(400).json({
            error: 'Validation error',
            details: error.errors.map((e: any) => ({
                field: e.path.join('.'),
                message: e.message,
            })),
        });
    }
};
