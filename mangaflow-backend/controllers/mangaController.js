import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();
import {
  HTTP_STATUS,
  ERROR_MESSAGES,
  SUCCESS_MESSAGES,
} from "../utils/constants.js";

// Получить список всех манг
export const getAllManga = async (req, res, next) => {
  try {
    const mangas = await prisma.books.findMany({
      include: {
        authors: {
          include: {
            author: true,
          },
        },
        genres: {
          include: {
            genre: true,
          },
        },
      },
    });

    res.status(HTTP_STATUS.OK).json({
      success: true,
      data: mangas,
      count: mangas.length,
    });
  } catch (error) {
    next(error);
  }
};

// Получить мангу по ID
export const getMangaById = async (req, res, next) => {
  try {
    const { id } = req.params;

    const manga = await prisma.books.findUnique({
      where: { id },
      include: {
        authors: {
          include: {
            author: true,
          },
        },
        genres: {
          include: {
            genre: true,
          },
        },
        chapters: true,
      },
    });

    if (!manga) {
      return res.status(HTTP_STATUS.NOT_FOUND).json({
        success: false,
        error: ERROR_MESSAGES.MANGA_NOT_FOUND,
      });
    }

    res.status(HTTP_STATUS.OK).json({
      success: true,
      data: manga,
    });
  } catch (error) {
    next(error);
  }
};

// Создать новую мангу
export const createManga = async (req, res, next) => {
  try {
    const {
      name,
      name_eng,
      description,
      status,
      total_chapters,
      publication_year,
    } = req.body;

    const manga = await prisma.books.create({
      data: {
        name,
        name_eng,
        description,
        status: status || "ONGOING",
        total_chapters: total_chapters ? parseInt(total_chapters) : null,
        publication_year: publication_year ? parseInt(publication_year) : null,
      },
    });

    res.status(HTTP_STATUS.CREATED).json({
      success: true,
      message: SUCCESS_MESSAGES.MANGA_CREATED,
      data: manga,
    });
  } catch (error) {
    next(error);
  }
};

// Обновить мангу
export const updateManga = async (req, res, next) => {
  try {
    const { id } = req.params;
    const updateData = req.body;

    const manga = await prisma.books.update({
      where: { id },
      data: updateData,
    });

    res.status(HTTP_STATUS.OK).json({
      success: true,
      message: SUCCESS_MESSAGES.MANGA_UPDATED,
      data: manga,
    });
  } catch (error) {
    next(error);
  }
};

// Удалить мангу
export const deleteManga = async (req, res, next) => {
  try {
    const { id } = req.params;

    await prisma.books.delete({
      where: { id },
    });

    res.status(HTTP_STATUS.OK).json({
      success: true,
      message: SUCCESS_MESSAGES.MANGA_DELETED,
    });
  } catch (error) {
    next(error);
  }
};
