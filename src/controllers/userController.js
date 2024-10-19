import User from '../models/user.js';

export const getAllUsers = async (_req, res) => {
  try {
    const users = await User.find();
    res.json(users);
  } catch (error) {
    res.status(500).json({ message: 'Erro ao buscar usários.', error: error.message });
  }
}

export const updateUser = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    user.name = req.body.name;
    user.username = req.body.username;
    user.password = req.body.password;
    await user.save();
    res.json(user);
  } catch (error) {
    res.status(500).json({ message: 'Erro ao atualizar usuário.', error: error.message });
  }
}

export const getUser = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    res.json(user);
  } catch (error) {
    res.status(500).json({ message: 'Erro ao buscar usuário.', error: error.message });
  }
}

export const deleteUser = async (req, res) => {
  try {
    await User.findByIdAndDelete(req.params.id);
    res.json({ message: 'Usário excluído com sucesso.' });
  } catch (error) {
    res.status(500).json({ message: 'Erro ao excluir usuário.', error: error.message });
  }
}

export const createUser = async (req, res) => {
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
}