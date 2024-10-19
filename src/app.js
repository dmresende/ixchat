import express from 'express';
import dotenv from 'dotenv';
import User from './routes/user.js';
import connectionDB from './db/connectionDB.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

const main = async () => {
  try {
    await connectionDB();
    console.log('Connected to MongoDB 🎉');

    app.use('/users', User);

    app.listen(PORT, () => {
      console.log(`Server running at ${PORT} 🚀`);
    });
  } catch (err) {
    console.error('MongoDB connection error:', err);
  }
}

main();