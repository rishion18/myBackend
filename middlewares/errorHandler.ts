import { NextFunction, Request, Response } from "express";

export class AppError extends Error {
    statusCode: number;
    constructor(message: string, statusCode: number) {
        super(message);
        this.statusCode = statusCode;
    }
}

export const errorHandler = (
    err: any,
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    const status = err.statusCode || 500;
    const message = err.message || 'Something went wrong';
    
    res.status(status).json({
      success: false,
      message,
    });
  };