import express from 'express';
import session from 'express-session'; // Gerenciamento de sessão
import passport from './config/passport.js';
import dotenv from 'dotenv';
import connectionDB from './config/connectionDB.js';
import userRoutes from './routes/user.js';
import cors from 'cors';

const app = express();
app.use(cors());
const PORT = process.env.PORT || 3333;

dotenv.config();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));


app.use(session({
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: false,
}))

app.use(passport.initialize());
app.use(passport.session());

const main = async () => {
  try {
    await connectionDB();
    console.log('Connected to MongoDB 🎉');

    app.use('/users', userRoutes);
    app.use('/message', userRoutes);

    app.listen(PORT, () => {
      console.log(`Server running at http://localhost:${PORT} 🚀`);
    });
  } catch (err) {
    console.error('MongoDB connection error:', err);
  }
}

main();