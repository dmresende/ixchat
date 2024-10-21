import Message from '../models/message.js';
import mongoose from 'mongoose';

export const sendMessage = async (req, res) => {
  const { receiverId, content } = req.body;
  const senderId = req.user._id;

  try {
    // Validar se receiverId é um ObjectId válido
    if (!mongoose.Types.ObjectId.isValid(receiverId)) {
      return res.status(400).json({ message: 'ID do receptor inválido.' });
    }

    const newMessage = new Message({
      senderId,
      receiverId: new mongoose.Types.ObjectId(receiverId),
      content
    });

    await newMessage.save();

    res.status(201).json({ message: 'Mensagem enviada com sucesso.', newMessage });
  } catch (error) {
    res.status(500).json({ message: 'Erro ao enviar mensagem.', error: error.message });
  }
};

export const getMessagesBetweenUsers = async (req, res) => {
  const { userId } = req.params;
  const senderId = req.user._id;

  try {
    if (!mongoose.Types.ObjectId.isValid(userId)) {
      return res.status(400).json({ message: 'ID do usuário inválido.' });
    }

    const messages = await Message.find({
      $or: [
        { senderId, receiverId: userId },
        { senderId: userId, receiverId: senderId }
      ]
    }).sort({ timestamp: 1 });

    res.json(messages);
  } catch (error) {
    console.error('Erro ao buscar mensagens:', error);
    res.status(500).json({ message: 'Erro ao buscar mensagens.', error: error.message });
  }
};

export const markMessageAsRead = async (req, res) => {
  const { messageId } = req.params;

  try {
    const message = await Message.findById(messageId);

    if (!message) {
      return res.status(404).json({ message: 'Mensagem não encontrada.' });
    }

    message.read = true;
    await message.save();

    res.json({ message: 'Mensagem marcada como lida.', message });
  } catch (error) {
    res.status(500).json({ message: 'Erro ao marcar mensagem como lida.', error: error.message });
  }
};

export const deleteMessage = async (req, res) => {
  const { messageId } = req.params;

  try {
    await Message.findByIdAndDelete(messageId);
    res.json({ message: 'Mensagem excluída com sucesso.' });
  } catch (error) {
    res.status(500).json({ message: 'Erro ao excluir mensagem.', error: error.message });
  }
};
