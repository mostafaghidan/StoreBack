import { NextFunction, Request, Response } from 'express';
export interface Error {
  name?: string;
  stack?: string;
  message?: string;
  status?: number;
}
const errorHandler = (
  error: Error,
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  const status = error.status || 500;
  const message = error.message || 'Something Wrong';
  res.status(status).json({ status, message });
  next();
};
export default errorHandler;
