import { CustomAPIError } from '../error/CustomAPIError.js';

export const errorHandler = async (err, req, res, next) => {
  if (err instanceof CustomAPIError) {
    return res.status(err.statusCode).json({
      success: false,
      msg: err.message,
    });
  }

  return res.status(500).json({
    msg: 'Something went wrong. Please try again!',
    error: err.message,
  });
};
