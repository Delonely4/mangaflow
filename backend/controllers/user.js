import { registerUser, loginUser } from "../services/userService.js";

import {
  validateRegistrationData,
  validateLoginData,
} from "../validators/validateUser.js";

import config from "../config/config.js";

export const register = async (req, res) => {
  try {
    const { username, email, password } = req.body;
    const validation = validateRegistrationData({ username, email, password });
    if (!validation.isValid) {
      return res.status(400).json({
        success: false,
        message: validation.message,
      });
    }
    const { token, user } = await registerUser({ username, email, password });

    res.cookie("token", token, {
      httpOnly: config.cookie.httpOnly,
      secure: config.cookie.secure,
      sameSite: config.cookie.sameSite,
      maxAge: config.jwt.cookieMaxAge,
    });

    res.status(201).json({
      success: true,
      message: "User registered successfully",
      user,
    });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const validation = validateLoginData({ email, password });
    if (!validation.isValid) {
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

    res.status(200).json({
      success: true,
      message: "Login successful",
      token,
      user,
    });
  } catch (error) {
    res.status(401).json({ success: false, message: error.message });
  }
};

export const logout = async (req, res) => {
  try {
    res.clearCookie("token", {
      httpOnly: config.cookie.httpOnly,
      secure: config.cookie.secure,
      sameSite: config.cookie.sameSite,
    });
    res.status(200).json({
      success: true,
      message: "Logout successful",
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const protectedRoute = async (req, res) => {
  res.status(200).json({
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
    const user = req.user;

    res.status(200).json({
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
    console.error("Get me error:", error);
    res.status(500).json({
      success: false,
      message: "Server error while fetching user data",
    });
  }
};
