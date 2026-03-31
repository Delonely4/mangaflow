import fs from "fs/promises";
import path from "path";
import logger from "../utils/logger.js";

const UPLOAD_DIR = path.join(process.cwd(), "server", "static", "avatars");

export const deleteAvatarFile = async (avatarPath) => {
  if (!avatarPath) return;

  let filename = avatarPath;

  if (avatarPath.includes("/")) {
    filename = path.basename(avatarPath);
  }

  if (filename === "default.png") return;

  const filePath = path.join(UPLOAD_DIR, filename);

  try {
    await fs.unlink(filePath);
    logger.info(`Deleted old avatar: ${filename}`);
  } catch (error) {
    if (error.code !== "ENOENT") {
      logger.error(`Error deleting file ${filename}:`, error);
    } else {
      logger.warn(`File ${filename} does not exist.`);
    }
  }
};
