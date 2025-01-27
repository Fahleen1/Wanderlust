import {
  checkExistedUser,
  createUser,
  getUserById,
} from '../services/user.service';
import { ApiError } from '../utils/ApiError';
import ApiResponse from '../utils/ApiResponse';
import { NextFunction, Request, Response } from 'express';

export const registerUser = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    // Get user data
    const { fullname, username, email, password } = req.body;

    // Check if its empty(Validation)
    if (!fullname || !username || !email || !password) {
      throw new ApiError(400, 'All fields are required');
    }

    // Check if user already exists
    const existedUser = await checkExistedUser(username, email);
    if (existedUser) {
      throw new ApiError(409, 'User already existed');
    }

    // Register user
    const user = await createUser(fullname, username, email, password);

    // Check user creation
    const createdUser = await getUserById(user._id);
    if (!createdUser) {
      throw new ApiError(404, 'User is not created successfully');
    }

    // Return response
    return res
      .status(201)
      .json(new ApiResponse(201, createdUser, 'User created successfully'));
  } catch (error) {
    next(error);
  }
};
