import { CustomAPIError } from '../error/CustomAPIError.js';
import City from '../models/cityModel.js';
import { asyncWrapper } from '../utils/asyncWrapper.js';

export const getAllCities = asyncWrapper(async (req, res, next) => {
  const cities = await City.find({ user: req.user.userId });

  res.status(200).json({
    success: true,
    data: {
      results: cities.length,
      cities,
    },
  });
});

export const createCity = async (req, res, next) => {
  const city = await City.create({
    ...req.body,
    user: req.user.userId
  });

  res.status(201).json({
    success: true,
    data: {
      city,
    },
  });
};

export const getCity = asyncWrapper(async (req, res, next) => {
  const { id } = req.params;

  const city = await City.findOne({ _id: id, user: req.user.userId });

  if (!city) {
    return next(new CustomAPIError(`No city with id : ${id}`, 404));
  }

  res.status(200).json({
    success: true,
    data: city,
  });
});

export const updateCity = asyncWrapper(async (req, res, next) => {
  const { id } = req.params;

  const city = await City.findOneAndUpdate(
    { _id: id, user: req.user.userId },
    req.body,
    {
      new: true,
      runValidators: true,
    }
  );

  if (!city) {
    return next(new CustomAPIError(`No city with id : ${id}`, 404));
  }

  res.status(200).json({
    success: true,
    data: {
      city,
    },
  });
});

export const deleteCity = asyncWrapper(async (req, res, next) => {
  const { id } = req.params;

  const city = await City.findOneAndDelete({ _id: id, user: req.user.userId });

  if (!city) {
    return next(new CustomAPIError(`No city with id : ${id}`, 404));
  }

  res.status(200).json({
    success: true,
    msg: 'City Deleted Successfully',
  });
});
