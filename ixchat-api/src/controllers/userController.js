import User from '../models/user.js';
import bcrypt from 'bcrypt';

export const login = async (req, res) => {
  const { username, password } = req.body;

  try {
    const user = await User.findOne({ username });

    if (!user)
      return res.status(401).json({ message: 'Usuário ou senha incorretos.' });

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch)
      return res.status(401).json({ message: 'Usuário ou senha incorretos.' });

    req.login(user, (err) => {
      if (err) return res.status(500).json({ message: 'Erro ao autenticar usuário.' });
      return res.json({ message: 'Login realizado com sucesso!', user });
    });

  } catch (error) {
    res.status(500).json({ message: 'Erro ao fazer login.', error: error.message });
  }
};

export const getAllUsers = async (_req, res) => {
  try {
    const users = await User.find({}, 'name username photo').lean();
    const formattedUsers = users.map(user => ({
      id: user._id,
      name: user.name,
      username: user.username,
      photo: user.photo
    }));

    res.json(formattedUsers);

  } catch (error) {
    res.status(500).json({ message: 'Erro ao buscar usários.', error: error.message });
  }
}

export const updateUser = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);

    if (!user)
      return res.status(404).json({ message: 'Usuário não encontrado.' });

    const { name, username, password } = req.body;

    user.name = name || req.body.name;
    user.username = username || req.body.username;

    if (password) {
      const hashedPassword = await bcrypt.hash(password, 10);
      user.password = hashedPassword;
    }

    await user.save();

    return res.json({ message: 'Registro atualizado com sucesso', user });

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
    const { name, username, password, photo } = req.body;

    if (!name || !username || !password)
      return res.status(400).json({ message: 'Por favor, forneça nome, username e senha.' });

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new User({ name, username, password: hashedPassword, photo });
    await newUser.save();

    res.status(201).json({ message: 'Usuário cadastrado com sucesso.' });

  } catch (error) {
    if (error.code === 11000) {
      return res.status(400).json({ message: 'Username já existe.' });
    }
    res.status(500).json({ message: 'Erro ao cadastrar usuário.', error: error.message });
  }
};


