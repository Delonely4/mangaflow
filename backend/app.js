import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import authRoutes from "./routes/routes.js";
import bookRoutes from "./routes/bookRoutes.js";
import chapterRoutes from "./routes/chapterRoutes.js";

const app = express();

app.use(express.json());
app.use(
  cors({
    origin: ["http://localhost:5173", process.env.FRONTEND_URL],
    credentials: true,
  })
);
app.use(cookieParser());

app.get("/", (req, res) => {
  res.json({
    message: "MangaFlow!",
    version: "1.0.0",
    endpoints: {
      register: "POST /api/auth/register",
      login: "POST /api/auth/login",
      protected: "GET /api/auth/protected",

      getAllBooks: "GET /api/books",
      getBook: "GET /api/books/:id",
      createBook: "POST /api/books",
      updateBook: "PUT /api/books/:id",
      deleteBook: "DELETE /api/books/:id",

      getChapters: "GET /api/chapters/book/:bookId",
      createChapter: "POST /api/chapters",
      createMultipleChapters: "POST /api/chapters/bulk",
      toggleChapterRead: "POST /api/chapters/:bookId/:number/read",
      updateChapter: "PUT /api/chapters/:id",
      deleteChapter: "DELETE /api/chapters/:id",
    },
  });
});

app.use("/api/auth", authRoutes);
app.use("/api/books", bookRoutes);
app.use("/api/chapters", chapterRoutes);

export default app;
