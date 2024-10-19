import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();

const connectionDB = async () => {
  await mongoose.connect(process.env.MONGODB_URI);
}

export default connectionDB