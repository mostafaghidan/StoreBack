import { NextFunction, Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import { User } from '../models/Users';
const JWT_SEC = process.env.JWT_SEC as string;
export function generateToken(user: User): string {
  return jwt.sign({ user }, JWT_SEC);
}
export function verifyToken(
  req: Request,
  res: Response,
  next: NextFunction
): void {
  try {
    if (!req.headers.authorization) {
      res.status(404).json('Missed token');
    } else if (req.headers.authorization) {
      const token = req.headers.authorization.split(
        ' '
      )[2] as unknown as string;
      jwt.verify(token, JWT_SEC);
    }
    next();
  } catch (error) {
    res.status(404).json('invalid token');
  }
}
