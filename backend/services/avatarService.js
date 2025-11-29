import fs from "fs/promises";
import path from "path";

const UPLOAD_DIR = path.join(process.cwd(), "server", "static", "avatars");

export const deleteAvatarFile = async (filename) => {
  if (!filename) return;

  if (filename === "default.png") return;

  const filePath = path.join(UPLOAD_DIR, filename);

  try {
    await fs.unlink(filePath);
    console.log("Deleted old avatar: ${filename}");
  } catch (error) {
    if (error.code !== "ENOENT") {
      console.error("Error deleting file ${filename:", error);
    }
  }
};
