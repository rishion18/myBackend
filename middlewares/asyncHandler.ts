import { NextFunction, Request, Response } from "express";

//type of async function that we will pass in asyncHandler
type AsyncFunction = (
  req: Request,
  res: Response,
  next: NextFunction,
) => Promise<void>;

//it can also be declared as interface
// interface AsyncFunction {
//     (req: Request, res: Response, next: NextFunction):  Promise<void>
// }

export const asyncHandler = (fn: AsyncFunction) => {
  return (req: Request, res: Response, next: NextFunction) => {
    fn(req, res, next).catch(next);
  };
};
