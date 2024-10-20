import express from 'express';
import { sendMessage, getMessagesBetweenUsers, markMessageAsRead, deleteMessage } from '../controllers/messageController.js';
import authMiddleware from '../middleware/authMiddleware.js';

const router = express.Router();

router.post('/', authMiddleware, sendMessage);
router.post('/between', authMiddleware, getMessagesBetweenUsers);
router.get('/', authMiddleware, markMessageAsRead);
router.delete('/:id', authMiddleware, deleteMessage);

export default router;