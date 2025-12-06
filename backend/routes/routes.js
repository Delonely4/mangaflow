import express from "express";
import userRoutes from "./userRoutes.js";
import bookRoutes from "./bookRoutes.js";
import chapterRoutes from "./chapterRoutes.js";

const router = express.Router();

router.use("/auth", userRoutes);
router.use("/books", bookRoutes);
router.use("/chapters", chapterRoutes);

export default router;
