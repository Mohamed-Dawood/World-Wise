import jwt from 'jsonwebtoken';
import { User } from '../models/userModel.js';

import { asyncWrapper } from '../utils/asyncWrapper.js';
import { CustomAPIError } from '../error/CustomAPIError.js';

export const getAllUsers = asyncWrapper(async (req, res, next) => {
  const users = await User.find({});

  res.status(200).json({
    success: true,
    data: {
      results: users.length,
      users,
    },
  });
});
export const signup = asyncWrapper(async (req, res, next) => {
  const user = await User.create({ ...req.body });

  const token = user.createJWT();

  res.status(201).json({
    success: true,
    data: {
      user: { name: user.name },
      token,
    },
  });
});

export const signin = asyncWrapper(async (req, res, next) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return next(new CustomAPIError('Please provide email and password', 404));
  }

  const user = await User.findOne({ email });

  if (!user) {
    return next(new CustomAPIError('Invalid Credentials', 401));
  }

  const isPasswordCorrect = await user.comparePassword(password);

  if (!isPasswordCorrect) {
    return next(new CustomAPIError('Invalid Credentials', 401));
  }

  const token = user.createJWT();

  res.status(200).json({ success: true, data: { name: user.name }, token });
});
