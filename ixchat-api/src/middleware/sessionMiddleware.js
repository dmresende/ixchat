import session from 'express-session';
import MongoStore from 'connect-mongo';
import dotenv from 'dotenv';

dotenv.config();

const store = MongoStore.create({
  mongoUrl: process.env.MONGODB_URI,
});

const sessionMiddleware = session({
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: false,
  store: store,
  cookie: {
    secure: process.env.NODE_ENV === 'production',
    httpOnly: true,
    maxAge: Number(process.env.SESSION_COOKIE_MAX_AGE),
  }
});

export { sessionMiddleware, store };