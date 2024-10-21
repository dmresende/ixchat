import express from 'express';
import { getAllUsers, login, getUser, createUser, updateUser, deleteUser } from '../controllers/userController.js';
import authMiddleware from '../middleware/authMiddleware.js';

const router = express.Router();

//difinição de rotas publicas e privadas
router.post('/login', login);
router.post('', createUser);

router.get('/', getAllUsers); // problemas com autenticação 
router.get('/:id', authMiddleware, getUser);
router.put('/:id', authMiddleware, updateUser);
router.delete('/:id', authMiddleware, deleteUser);

export default router;
