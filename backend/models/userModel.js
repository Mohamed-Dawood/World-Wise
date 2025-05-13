import mongoose from 'mongoose';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Please provide name'],
      maxLength: 50,
      minLength: 3,
      trim: true,
    },
    email: {
      type: String,
      required: [true, 'Please provide email'],
      match: [
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
        'Please provide a valid email',
      ],
      // unique:true
    },
    password: {
      type: String,
      required: [true, 'Please provide password'],
      minLength: 6,
    },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

userSchema.pre('save', async function () {
  const slat = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, slat);
});

userSchema.methods.createJWT = function () {
  return jwt.sign(
    { userId: this._id, name: this.name },
    process.env.JWT_SECRET_KEY,
    { expiresIn: '30d' }
  );
};

userSchema.methods.comparePassword = async function (candidatePassword) {
  const isMatch = await bcrypt.compare(candidatePassword, this.password);
  return isMatch;
};

export const User = mongoose.model('User', userSchema);
