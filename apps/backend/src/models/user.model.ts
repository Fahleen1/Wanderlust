import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import mongoose, { Schema } from 'mongoose';

export interface IUser {
  _id: string;
  fullname: string;
  username: string;
  email: string;
  password: string;
  refreshToken?: string;
}

const userSchema = new Schema(
  {
    fullname: {
      type: String,
      required: true,
    },
    username: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    refreshToken: {
      type: String,
    },
  },
  { timestamps: true },
);

userSchema.pre('save', async function (next) {
  if (!this.isModified('password')) return next();
  this.password = await bcrypt.hash(this.password, 10);
  next();
});

//generate access token
userSchema.methods.generateAccessToken = function () {
  if (!process.env.ACCESS_TOKEN_SECRET) {
    throw new Error(
      'ACCESS_TOKEN_SECRET is not defined in the environment variables',
    );
  }

  return jwt.sign(
    {
      _id: this._id,
      username: this.username,
      email: this.username,
    },
    process.env.ACCESS_TOKEN_SECRET,
    {
      expiresIn: '1d',
    },
  );
};

//generate refresh token
userSchema.methods.generateRefreshToken = function () {
  if (!process.env.REFRESH_TOKEN_SECRET) {
    throw new Error(
      'REFRESH_TOKEN_SECRET is not defined in the environment variables',
    );
  }

  return jwt.sign({ _id: this._id }, process.env.REFRESH_TOKEN_SECRET, {
    expiresIn: '10d',
  });
};

export const User = mongoose.model<IUser>('User', userSchema);
