import { ERROR_CODES } from "../constants/errorCodes.js";
import { NextFunction, Request, Response } from "express";
import { AppError } from "../middlewares/errorHandler.js";
import { ZodSchema } from "zod";

export const validate = 
(schema: ZodSchema) => 
(req: Request, res: Response, next: NextFunction) => {
    const result = schema.safeParse(req.body);
    if (!result.success) {
      throw new AppError(result.error.message, ERROR_CODES.BAD_REQUEST);
    }

   req.body = result.data;
    next();
}