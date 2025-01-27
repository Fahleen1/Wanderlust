import { getUserById } from '../services/user.service';
import { ApiError } from '../utils/ApiError';
import { NextFunction, Request, Response } from 'express';
import jwt from 'jsonwebtoken';

export const verifyJwt = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const token =
      req.cookies?.accessToken ||
      req.header('Authorization')?.replace('Bearer ', '');

    if (!token) throw new ApiError(401, 'Unauthorized');
    if (!process.env.ACCESS_TOKEN_SECRET) {
      throw new ApiError(500, 'Error getting access token from env');
    }
    const decodedToken = jwt.verify(
      token,
      process.env.ACCESS_TOKEN_SECRET,
    ) as jwt.JwtPayload;
    const user = getUserById(decodedToken?._id);
    if (!user) throw new ApiError(401, 'User not found');
    req.user = user;
    next();
  } catch (error) {
    throw new ApiError(401, (error as Error)?.message);
  }
};
