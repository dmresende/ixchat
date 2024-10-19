import User from '../models/user.js';
import bcrypt from 'bcrypt';

export const loggin = async (req, res) => {
  console.log(req.body);
  const { username, password } = req.body;

  try {
    const user = await User.findOne({ username }); // Procura o usuário

    if (!user) {
      return res.status(401).json({ message: 'Usuário ou senha incorretos.' });
    }

    // Verifica se a senha inserida corresponde à senha hashada
    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(401).json({ message: 'Usuário ou senha incorretos.' });
    }

    // Se tudo estiver correto, loga o usuário
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

    if (!name || !username || !password) {
      return res.status(400).json({ message: 'Por favor, forneça nome, username e senha.' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    console.log(`Senha antes do hash: ${password}`); // Log da senha original
    console.log(`Hash gerado: ${hashedPassword}`); // Log do hash gerado

    const newUser = new User({ name, username, password: hashedPassword });
    await newUser.save();

    res.status(201).json({ message: 'Usuário cadastrado com sucesso.' });
  } catch (error) {
    if (error.code === 11000) {
      return res.status(400).json({ message: 'Username já existe.' });
    }
    res.status(500).json({ message: 'Erro ao cadastrar usuário.', error: error.message });
  }
};


