import bcrypt from "bcryptjs";
import prisma from "../models/prisma.js";
import { generateToken } from "../utils/jwt.js";
import config from "../config/config.js";
import { deleteAvatarFile } from "./avatarService.js";
import logger from "../utils/logger.js";

export const registerUser = async ({ username, email, password }) => {
  const existingUser = await prisma.user.findFirst({
    where: {
      OR: [
        { email: email.toLowerCase() },
        { username: username.toLowerCase() },
      ],
    },
  });

  if (existingUser) {
    throw new Error("User with this email or username already exists");
  }

  const hashedPassword = await bcrypt.hash(
    password,
    config.security.saltRounds
  );

  const newUser = await prisma.user.create({
    data: {
      username: username.trim(),
      email: email.toLowerCase().trim(),
      password: hashedPassword,
    },
    select: {
      id: true,
      username: true,
      email: true,
      avatar: true,
      created_at: true,
    },
  });

  const token = generateToken(newUser.id);

  return { token, user: newUser };
};

export const loginUser = async ({ email, password }) => {
  const user = await prisma.user.findUnique({
    where: { email: email.toLowerCase() },
  });

  if (!user) {
    throw new Error("Invalid email or password");
  }

  const isPasswordValid = await bcrypt.compare(password, user.password);

  if (!isPasswordValid) {
    throw new Error("Invalid email or password");
  }

  const token = generateToken(user.id);

  return {
    token,
    user: {
      id: user.id,
      username: user.username,
      email: user.email,
      avatar: user.avatar,
      created_at: user.created_at,
    },
  };
};

export const updateUserAvatar = async (userId, newFilename) => {
  const user = await prisma.user.findUnique({
    where: { id: parseInt(userId) },
  });

  if (!user) {
    throw new Error("User not found");
  }

  if (user.avatar) {
    try {
      await deleteAvatarFile(user.avatar);
      logger.info("Old avatar deleted: ", user.avatar);
    } catch (err) {
      logger.warn("Can't delete old file: ", err.message);
    }
  }

  const baseUrl = process.env.API_URL || "http://localhost:3000";
  const fullUrl = `${baseUrl}/static/avatars/${newFilename}`;

  logger.info("Save new link in db: ", fullUrl);

  const updatedUser = await prisma.user.update({
    where: { id: parseInt(userId) },
    data: {
      avatar: fullUrl,
    },

    select: {
      id: true,
      username: true,
      email: true,
      avatar: true,
    },
  });

  return updatedUser;
};
