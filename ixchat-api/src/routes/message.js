import express from 'express';
import { sendMessage, getMessagesBetweenUsers, markMessageAsRead, deleteMessage } from '../controllers/messageController.js';
import authMiddleware from '../middleware/authMiddleware.js';

const router = express.Router();

router.post('/', authMiddleware, sendMessage);
router.get('/between/:userId', authMiddleware, getMessagesBetweenUsers);
router.put('/:messageId/read', authMiddleware, markMessageAsRead);
router.delete('/:messageId', authMiddleware, deleteMessage);

export default router;
