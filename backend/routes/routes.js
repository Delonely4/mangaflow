import express from "express";
import {
  register,
  login,
  protectedRoute,
  logout,
  getMe,
} from "../controllers/user.js";
import { authenticateToken } from "../middlewares/middleware.js";

const router = express.Router();

router.post("/register", register);
router.post("/login", login);
router.post("/logout", logout);
router.get("/protected", authenticateToken, protectedRoute);
router.get("/me", authenticateToken, getMe);

export default router;
