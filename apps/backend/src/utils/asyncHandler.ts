import { NextFunction, Request, Response } from 'express';

type asyncRequestHandler = (
  req: Request,
  res: Response,
  next: NextFunction,
) => Promise<any>;

export const asyncHandler =
  (fn: asyncRequestHandler) =>
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      await fn(req, res, next);
    } catch (error) {
      next();
    }
  };
