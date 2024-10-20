import mongoose from 'mongoose';

//define schema usuario
const userSchema = new mongoose.Schema({
  name: String,
  username: { type: String, unique: true },
  password: String,
  photo: String,
  createdAt: { type: Date, default: Date.now },
  online: Boolean,
  createdAt: Date,
  updatedAt: Date
});

const User = mongoose.model('User', userSchema);

export default User;