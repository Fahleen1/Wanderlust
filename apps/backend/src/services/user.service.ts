import { User } from '../models/user.model';

export const getUserById = async (id: string) => {
  const user = await User.findById(id).select('-password -refreshToken');
  return user;
};

export const checkExistedUser = async (username: string, email: string) => {
  const user = await User.findOne({ $or: [{ username }, { email }] });
  return user;
};

export const createUser = async (
  fullname: string,
  username: string,
  email: string,
  password: string,
) => {
  const user = await User.create({ fullname, username, email, password });
  return user;
};

export const updateUser = async (id: string) => {
  const user = await User.findByIdAndUpdate(
    id,
    { $set: { refreshToken: undefined } },
    { new: true },
  );
  return user;
};
