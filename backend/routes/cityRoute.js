import express from 'express';
import {
  createCity,
  deleteCity,
  getAllCities,
  getCity,
  updateCity,
} from '../controllers/cityController.js';

const router = express.Router();

router.route('/').get(getAllCities).post(createCity);

router.route('/:id').get(getCity).patch(updateCity).delete(deleteCity);

export default router;
