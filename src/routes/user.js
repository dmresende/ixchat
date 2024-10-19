import express from 'express';
import User from '../models/user.js';

const router = express.Router();

// Rota para cadastro de usuário
router.post('', async (req, res) => {
  try {
    const { name, username, password } = req.body;

    if (!name || !username || !password)
      return res.status(400).json({ message: 'Por favor, forneça nome, username e senha.' });

    const newUser = new User({ name, username, password });
    await newUser.save();

    res.status(201).json({ message: 'Usuário cadastrado com sucesso.' });
  } catch (error) {
    if (error.code === 11000) {
      return res.status(400).json({ message: 'Username já existe.' });
    }
    res.status(500).json({ message: 'Erro ao cadastrar usuário.', error: error.message });
  }
});

router.get('/', async (req, res) => {
  try {
    const users = await User.find();
    res.json(users);
  } catch (error) {
    res.status(500).json({ message: 'Erro ao buscar usários.', error: error.message });
  }
});

export default router;
