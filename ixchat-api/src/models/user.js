import mongoose from 'mongoose';

// Definição do esquema do usuário
const userSchema = new mongoose.Schema({
  name: String,
  username: { type: String, unique: true },
  password: String,
});

// Criação do modelo de usuário
const User = mongoose.model('User', userSchema);

export default User;