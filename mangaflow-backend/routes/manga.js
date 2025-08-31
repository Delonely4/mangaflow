import express from "express";
import {
  getAllManga,
  getMangaById,
  createManga,
  updateManga,
  deleteManga,
} from "../controllers/mangaController.js";
import { validateManga, validateId } from "../middleware/validation.js";

const router = express.Router();

router.get("/", getAllManga);

router.get("/:id", validateId, getMangaById);

router.post("/", validateManga, createManga);

router.put("/:id", validateId, validateManga, updateManga);

router.delete("/:id", validateId, deleteManga);

export default router;
