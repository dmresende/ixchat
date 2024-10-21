import express from 'express';
import passport from './config/passport.js';
import dotenv from 'dotenv';
import connectionDB from './config/connectionDB.js';
import userRoutes from './routes/user.js';
import messageRoutes from './routes/message.js';
import cors from 'cors';
import { Server } from 'socket.io';
import { sessionMiddleware } from './middleware/sessionMiddleware.js';
import sharedsession from 'express-socket.io-session';
import swaggerUi from 'swagger-ui-express';
import fs from 'fs';
import http from 'http';

const app = express();
app.use(cors());
const PORT = process.env.PORT || 3333;

const swaggerFile = JSON.parse(fs.readFileSync('./swagger-output.json', 'utf-8'));
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerFile));
app.get('/', (req, res) => {
  res.redirect('/api-docs');
});

//documentação - const io = new Server(server);
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: "http://localhost:3000",
    methods: ["GET", "POST"]
  }
});

//compartilha session com o socket
io.use(sharedsession(sessionMiddleware, {
  autoSave: true
}));

io.on('connection', (socket) => {
  console.log('Um usuário conectou');

  socket.on('join', (userId) => {
    socket.join(userId);
    console.log(`Usuário ${userId} entrou na sala`);
  });

  socket.on('sendMessage', async (messageData) => {
    const { senderId, receiverId, content } = messageData;

    try {
      const newMessage = new Message({
        senderId,
        receiverId,
        content,
      });
      await newMessage.save();

      io.to(receiverId).emit('newMessage', newMessage);
      io.to(senderId).emit('newMessage', newMessage);
    } catch (error) {
      console.error('Erro ao enviar mensagem:', error);
    }
  });

  socket.on('disconnect', () => {
    console.log('Um usuário desconectou');
  });
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
    app.use('/message', messageRoutes);

    server.listen(PORT, () => {
      console.log(`Server running at http://localhost:${PORT} 🚀`);
      console.log(`Swagger documentation available at http://localhost:${PORT}/api-docs`);
    });
  } catch (err) {
    console.error('MongoDB connection error:', err);
  }
}

main();
