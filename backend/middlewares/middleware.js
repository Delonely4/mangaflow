import prisma from "../models/prisma.js";
import { verifyToken } from "../utils/jwt.js";
import multer from "multer";
import { v4 as uuidv4 } from "uuid";
import path from "path";

export const authenticateToken = async (req, res, next) => {
  try {
    let token = req.cookies.token;

    if (!token) {
      const authHeader = req.headers["authorization"];
      token = authHeader && authHeader.split(" ")[1];
    }

    if (!token) {
      return res.status(401).json({
        success: false,
        message: "Access token required",
      });
    }

    const decoded = verifyToken(token);

    const user = await prisma.user.findUnique({
      where: { id: decoded.userId },
      select: {
        id: true,
        username: true,
        email: true,
        avatar: true,
        created_at: true,
      },
    });

    if (!user) {
      return res
        .status(403)
        .json({ success: false, message: "User not found" });
    }

    req.user = user;
    next();
  } catch (error) {
    if (error.name === "TokenExpiredError") {
      return res.status(401).json({ success: false, message: "Token expired" });
    } else if (error.name === "JsonWebTokenError") {
      return res.status(401).json({ success: false, message: "Invalid token" });
    }

    return res
      .status(500)
      .json({ success: false, message: "Token verification failed" });
  }
};

const storage = multer.diskStorage({
  destination(req, file, cb) {
    cb(null, "server/static/avatars/");
  },
  filename(req, file, cb) {
    const uniqueId = uuidv4();

    const extension = path.extname(file.originalname);
    const newFileName = `${uniqueId}${extension}`;
    cb(null, newFileName);
  },
});

const fileFilter = (req, file, cb) => {
  if (file.mimetype === "image/jpeg" || file.mimetype === "image/png") {
    cb(null, true);
  } else {
    cb(null, false);
  }
};

export const uploadAvatarMiddleware = multer({
  storage,
  fileFilter,
});
