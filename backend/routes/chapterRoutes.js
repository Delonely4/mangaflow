import express from 'express';
import {
    createChapter,
    getChaptersByBookId,
    updateChapter,
    deleteChapter,
    createMultipleChapters,
    toggleChapterRead
} from "../controllers/chapter.js";
import { authenticateToken } from "../middlewares/middleware.js";

const router = express.Router();

router.get('/book/:bookId', getChaptersByBookId);

router.post('/', authenticateToken, createChapter);
router.post('/bulk', authenticateToken, createMultipleChapters);
router.post('/:bookId/chapter-title/:chapter_number/read', authenticateToken, toggleChapterRead);
router.put('/:id', authenticateToken, updateChapter);
router.delete('/:id', authenticateToken, deleteChapter);

export default router;