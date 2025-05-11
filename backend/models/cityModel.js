import mongoose from 'mongoose';

const citySchema = new mongoose.Schema(
  {
    cityName: {
      type: String,
      required: [true, 'City name is required.'],
      trim: true,
    },
    country: {
      type: String,
      required: [true, 'Country is required for the city.'],
      trim: true,
    },
    emoji: {
      type: String,
      default: '',
    },
    date: {
      type: Date,
      default: Date.now,
      required: [true, 'Please provide a date.'],
    },
    notes: {
      type: String,
      default: '',
      trim: true,
    },
    position: {
      lat: {
        type: Number,
        required: [true, 'Latitude is required.'],
      },
      lng: {
        type: Number,
        required: [true, 'Longitude is required.'],
      },
    },
  },
  {
    timestamps: true,
    versionKey: false, // Removes __v
  }
);

const City = mongoose.model('City', citySchema);
export default City;
