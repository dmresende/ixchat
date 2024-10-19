import express from 'express';
import { getAllUsers, loggin, getUser, createUser, updateUser, deleteUser } from '../controllers/userController.js';

const router = express.Router();

// Middleware para garantir que o usuário está autenticado
const ensureAuthenticated = (req, res, next) => {
  if (req.isAuthenticated()) {
    return next();
  }
  res.status(401).json({ message: 'Você precisa estar autenticado para acessar esta rota.' });
};


router.post('/login', loggin);
router.post('', createUser);
router.get('/', getAllUsers);
router.get('/:id', ensureAuthenticated, getUser);
router.put('/:id', ensureAuthenticated, updateUser);
router.delete('/:id', ensureAuthenticated, deleteUser);

export default router;
