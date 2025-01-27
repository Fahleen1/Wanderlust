import {
  checkExistedUser,
  createUser,
  getUserById,
  updateUser,
} from '../services/user.service';
import { ApiError } from '../utils/ApiError';
import ApiResponse from '../utils/ApiResponse';
import { NextFunction, Request, Response } from 'express';
import jwt, { Jwt } from 'jsonwebtoken';

export const generateAccessAndRefreshToken = async (userId: string) => {
  try {
    const user = await getUserById(userId);
    const accessToken = await user?.generateAccessToken();
    const refreshToken = await user?.generateRefreshToken();
    user?.save({ validateBeforeSave: false });
    return { accessToken, refreshToken };
  } catch (error) {
    throw new ApiError(500, 'Error generating access & refresh tokens');
  }
};

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

export const loginUser = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    //get user credentials
    const { username, email, password } = req.body;
    if (!(username || email))
      throw new ApiError(400, 'Username or email must be required!');

    //Verify if user exists in db
    const user = await checkExistedUser(username, email);
    if (!user) throw new ApiError(404, 'User is not found!');

    //Check password
    const isPasswordValid = await user.isPasswordCorrect(password);
    if (!isPasswordValid) return new ApiError(404, 'Invalid password');

    //Check access and refresh tokens
    const { accessToken, refreshToken } = await generateAccessAndRefreshToken(
      user._id,
    );

    //Login the user
    const loggedInUser = await getUserById(user._id);

    //set options for cookies
    const options = {
      httpOnly: true,
      secure: true,
    };

    //Return response
    return res
      .status(200)
      .cookie('accessToken', accessToken, options)
      .cookie('refreshToken', refreshToken, options)
      .json(
        new ApiResponse(
          200,
          { user: loggedInUser, accessToken, refreshToken },
          'User logged In successfully',
        ),
      );
  } catch (error) {
    next(error);
  }
};

export const logoutUser = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    await updateUser(req.user?._id);
    const options = {
      http: true,
      secure: true,
    };

    return res
      .status(200)
      .clearCookie('accessToken', options)
      .clearCookie('refreshToken', options)
      .json(new ApiResponse(200, {}, 'Logout successfully'));
  } catch (error) {
    next(error);
  }
};

export const refreshAccessToken = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const incomingRefreshToken =
      req.cookies.refreshToken || req.body.refreshToken;
    if (!incomingRefreshToken) throw new ApiError(401, 'Unauthorized');

    if (!process.env.REFRESH_TOKEN_SECRET) {
      throw new ApiError(500, 'Error getting refresh token from env');
    }

    const decodedToken = jwt.verify(
      incomingRefreshToken,
      process.env.REFRESH_TOKEN_SECRET,
    ) as jwt.JwtPayload;
    const user = await getUserById(decodedToken?._id);

    if (!user) {
      throw new ApiError(401, 'Invalid refresh token');
    }

    //Validate refresh token
    if (incomingRefreshToken !== user?.refreshToken) {
      throw new ApiError(401, 'Refresh token is expired');
    }

    //Generate new token
    const options = {
      httpOnly: true,
      secure: true,
    };

    const { accessToken, refreshToken } = await generateAccessAndRefreshToken(
      user._id,
    );
    return res
      .status(200)
      .cookie('accessToken', accessToken, options)
      .cookie('refreshToken', refreshToken, options)
      .json(
        new ApiResponse(
          200,
          { accessToken, refreshToken },
          'Access token refreshed successfully',
        ),
      );
  } catch (error) {
    throw new ApiError(401, (error as Error)?.message);
  }
};
