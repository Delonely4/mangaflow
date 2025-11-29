import express from "express";
import {
  register,
  login,
  protectedRoute,
  logout,
  getMe,
  uploadAvatar,
} from "../controllers/user.js";
import {
  authenticateToken,
  uploadAvatarMiddleware,
} from "../middlewares/middleware.js";

import { uploadAvatar } from "../middleware/upload.js";
import { updateProfile } from "../controllers/user.controller.js";

const router = express.Router();

router.post("/register", register);
router.post("/login", login);
router.post("/logout", logout);
router.get("/protected", authenticateToken, protectedRoute);
router.get("/me", authenticateToken, getMe);
router.put(
  "/profile",
  authenticateToken,
  uploadAvatarMiddleware.single("avatar"),
  uploadAvatar
);

export default router;
