import express from 'express';
import {
    createChapter,
    getChaptersByBookId,
    updateChapter,
    deleteChapter,
    createMultipleChapters
} from "../controllers/chapter.js";
import { authenticateToken } from "../middlewares/middleware.js";

const router = express.Router();

router.get('/book/:bookId', getChaptersByBookId);

router.post('/', authenticateToken, createChapter);
router.post('/bulk', authenticateToken, createMultipleChapters);
router.put('/:bookId', authenticateToken, updateChapter);
router.delete('/:bookId', authenticateToken, deleteChapter);

export default router;