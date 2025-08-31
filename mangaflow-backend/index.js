import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { requestLogger, errorLogger } from "./middleware/logger.js";
import { errorHandler, notFoundHandler } from "./middleware/errorHandler.js";
import { checkDatabaseConnection } from "./config/database.js";
import mangaRoutes from "./routes/manga.js";
import { PrismaClient } from "@prisma/client";

dotenv.config();
const app = express();
const PORT = process.env.PORT || 5000;
const prisma = new PrismaClient();

app.use(cors());
app.use(express.json());
app.use(requestLogger);

app.get("/", (req, res) => {
  res.json({
    message: "MangaFlow API работает",
    version: "1.0.0",
    endpoints: {
      manga: "/api/manga",
    },
  });
});

app.use("/api/manga", mangaRoutes);

app.use(notFoundHandler);
app.use(errorLogger);
app.use(errorHandler);

const startServer = async () => {
  try {
    await checkDatabaseConnection(prisma);

    app.listen(PORT, () => {
      console.log(`Сервер запущен на http://localhost:${PORT}`);
      console.log(`API доступен по адресу: http://localhost:${PORT}/api/manga`);
      console.log(`Окружение: ${process.env.NODE_ENV || "development"}`);
    });
  } catch (error) {
    console.error("Ошибка запуска сервера:", error);
    process.exit(1);
  }
};

startServer();

process.on("SIGTERM", async () => {
  console.log("Получен сигнал SIGTERM, закрываем сервер...");
  await prisma.$disconnect();
  process.exit(0);
});
