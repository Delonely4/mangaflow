import { registerUser, loginUser } from "../services/userService.js";
import logger from "../utils/logger.js";

import {
  validateRegistrationData,
  validateLoginData,
} from "../validators/validateUser.js";

import config from "../config/config.js";

import * as userService from "../services/userService.js";

export const register = async (req, res) => {
  try {
    const { username, email, password } = req.body;
    logger.info("Start Validate registration data", { username, email });
    const validation = validateRegistrationData({ username, email, password });
    if (!validation.isValid) {
      logger.warn("Validation registration data failed", {
        message: validation.message,
      });
      return res.status(400).json({
        success: false,
        message: validation.message,
      });
    }
    logger.info("start registration user");
    const { token, user } = await registerUser({ username, email, password });

    res.cookie("token", token, {
      httpOnly: config.cookie.httpOnly,
      secure: config.cookie.secure,
      sameSite: config.cookie.sameSite,
      maxAge: config.jwt.cookieMaxAge,
    });

    return res.status(201).json({
      success: true,
      message: "User registered successfully",
      user,
    });
  } catch (error) {
    logger.error("Registration Error: ", error);
    return res.status(400).json({ success: false, message: error.message });
  }
};

export const login = async (req, res) => {
  try {
    logger.info("Start login user");
    const { email, password } = req.body;
    const validation = validateLoginData({ email, password });
    if (!validation.isValid) {
      logger.warn("Validation login data failed", {
        message: validation.message,
      });
      return res.status(400).json({
        success: false,
        message: validation.message,
      });
    }

    const { token, user } = await loginUser({ email, password });

    res.cookie("token", token, {
      httpOnly: config.cookie.httpOnly,
      secure: config.cookie.secure,
      sameSite: config.cookie.sameSite,
      maxAge: config.jwt.cookieMaxAge,
    });

    logger.info("User:", user.id, "logged in successfully");

    return res.status(200).json({
      success: true,
      message: "Login successful",
      token,
      user,
    });
  } catch (error) {
    logger.error("Login Error: ", error);
    return res.status(401).json({ success: false, message: error.message });
  }
};

export const logout = async (req, res) => {
  try {
    logger.info("Logout user:", req.user.id);
    res.clearCookie("token", {
      httpOnly: config.cookie.httpOnly,
      secure: config.cookie.secure,
      sameSite: config.cookie.sameSite,
    });
    return res.status(200).json({
      success: true,
      message: "Logout successful",
    });
  } catch (error) {
    logger.error("Logout Error: ", error);
    return res.status(500).json({ success: false, message: error.message });
  }
};

export const protectedRoute = async (req, res) => {
  return res.status(200).json({
    success: true,
    message: "Hello MangaFlow!",
    data: {
      user: req.user,
      timestamp: new Date().toISOString(),
      serverMessage: "You have accessed protected route!",
    },
  });
};

export const getMe = async (req, res) => {
  try {
    logger.info("Get me user:", req.user.id);
    const user = req.user;
    const avatar = user.avatar
      ? `${process.env.API_URL}/static/avatars/${user.avatar}`
      : null;

    return res.status(200).json({
      success: true,
      data: {
        user: {
          id: user.id,
          username: user.username,
          email: user.email,
          avatar: user.avatar,
          created_at: user.created_at,
        },
      },
    });
  } catch (error) {
    logger.error("Get me error:", error);
    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};

export const uploadAvatar = async (req, res, next) => {
  try {
    if (!req.file) {
      return res.status(400).json({
        success: false,
        message: "No file uploaded",
      });
    }

    const userId = req.user.id;
    const filename = req.file.filename;
    const updatedUser = await userService.updateUserAvatar(userId, filename);

    const fullUrl = `${process.env.API_URL}/static/avatars/${updatedUser.avatar}`;

    res.json({
      message: "Avatar updated successfully",
      user: {
        ...updatedUser,
        avatar: fullUrl,
      },
    });
  } catch (error) {
    logger.error("Upload error:", error);
    next(error);
  }
};
