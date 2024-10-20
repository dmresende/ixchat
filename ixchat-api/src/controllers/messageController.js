import Message from '../models/message.js';

export const sendMessage = async (req, res) => {
  console.log('req.body', req.body);

  const { receiverId, content } = req.body;
  const senderId = req.user._id;

  try {
    const newMessage = new Message({
      senderId,
      receiverId,
      content
    });

    await newMessage.save();

    res.status(201).json({ message: 'Mensagem enviada com sucesso.', newMessage });
  } catch (error) {
    res.status(500).json({ message: 'Erro ao enviar mensagem.', error: error.message });
  }
};

export const getMessagesBetweenUsers = async (req, res) => {
  const { userId } = req.params; // ID do usuário com quem o chat está sendo buscado
  const senderId = req.user._id; // Assumindo que o ID do usuário autenticado está em req.user

  try {
    const messages = await Message.find({
      $or: [
        { senderId, receiverId: userId },
        { senderId: userId, receiverId: senderId }
      ]
    }).sort({ timestamp: 1 }); // Ordenar as mensagens pelo timestamp

    res.json(messages);
  } catch (error) {
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

    message.read = true; // Marca a mensagem como lida
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
