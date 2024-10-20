import express from 'express';
import passport from './config/passport.js';
import dotenv from 'dotenv';
import connectionDB from './config/connectionDB.js';
import userRoutes from './routes/user.js';
import cors from 'cors';
import { Server } from 'socket.io';
import { sessionMiddleware } from './middleware/sessionMiddleware.js';
import sharedsession from 'express-socket.io-session';

const app = express();
app.use(cors());
const PORT = process.env.PORT || 3333;

const io = new Server(); //documentarion - const io = new Server(server);

//compartilha session com o socket
io.use(sharedsession(sessionMiddleware, {
  autoSave: true
}));

io.on('connection', (socket) => {
  const userId = socket.handshake.session.passport.user
  socket.join(userId);

  socket.on('sendMessage', async () => {
    const { receiverId, content } = messageData;
    const senderId = userId;

    try {
      const newMessage = new Message({
        senderId,
        receiverId,
        content,
      });
      await newMessage.save();

      io.to(receiverId.toString()).emit('newMessage', newMessage);
      socket.emit('newMessage', newMessage);
    } catch (error) {
      console.error('Erro ao enviar mensagem:', error);
    }
  })
});


dotenv.config();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//chama meu middleware de sessão
app.use(sessionMiddleware);

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