import jwt from 'jsonwebtoken';
import { CustomAPIError } from '../error/CustomAPIError.js';
import { asyncWrapper } from '../utils/asyncWrapper.js';

export const authentication = asyncWrapper(async (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith('Bearer')) {
    return next(new CustomAPIError('Authentication invalid', 401));
  }
  const token = authHeader.split(' ')[1];

  try {
    const payload = jwt.verify(token, process.env.JWT_SECRET_KEY);
    req.user = { userId: payload.userId, name: payload.name };
    console.log(req.user);
    next();
  } catch (error) {
    return next(new CustomAPIError('Authentication invalid', 401));
  }
});
