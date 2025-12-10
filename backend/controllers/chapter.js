import {
  createChapter as createChapterService,
  getChaptersByBookId as getChaptersByBookIdService,
  updateChapter as updateChapterService,
  deleteChapter as deleteChapterService,
  createMultipleChapters as createMultipleChaptersService,
  toggleChapterRead as toggleChapterReadService,
} from "../services/chapterService.js";
import logger from "../utils/logger.js";

import {
  validateChapterData,
  validateMultipleChapters,
  validateReadedChapterData,
} from "../validators/validateChapter.js";
import JWT from "jsonwebtoken";

export const createChapter = async (req, res) => {
  try {
    const { book_id, chapter_number, title, release_date } = req.body;

    const validation = validateChapterData({
      book_id,
      chapter_number,
      title,
      release_date,
    });

    if (!validation.isValid) {
      return res.status(400).json({
        success: false,
        message: validation.message,
      });
    }

    const newChapter = await createChapterService({
      book_id: parseInt(book_id),
      chapter_number: parseFloat(chapter_number),
      title: title?.trim(),
      release_date,
    });
    logger.info("Chapter created successfully", {
      book_id,
      chapterId: newChapter.id,
    });
    return res.status(201).json({
      success: true,
      message: "Chapter created successfully.",
      data: newChapter,
    });
  } catch (error) {
    logger.error("Create Chapter Error: ", error);
    return res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

export const getChaptersByBookId = async (req, res) => {
  try {
    const { bookId } = req.params;

    let userId = null;
    const authHeader = req.headers["authorization"];

    if (authHeader && authHeader.startsWith("Bearer ")) {
      const token = authHeader.split(" ")[1];
      try {
        const decoded = JWT.verify(token, process.env.JWT_SECRET);
        userId = decoded.userId;
      } catch (err) {
        userId = null;
      }
    }

    if (!bookId || isNaN(parseInt(bookId))) {
      return res.status(400).json({
        success: false,
        message: "Valid book ID must be provided",
      });
    }

    const result = await getChaptersByBookIdService(bookId, userId);
    logger.info("Chapters retrieved successfully", { bookId, userId });
    return res.status(200).json({
      success: true,
      message: "Chapter gets successfully.",
      data: result,
    });
  } catch (error) {
    logger.error("Get Chapters By Book ID Error: ", error);
    const statusCode = error.message === "Book not found" ? 404 : 500;
    return res.status(statusCode).json({
      success: false,
      message: error.message,
    });
  }
};

export const updateChapter = async (req, res) => {
  try {
    const { id } = req.params;
    const updateData = req.body;

    if (!id || isNaN(parseInt(id))) {
      return res.status(400).json({
        success: false,
        message: "Valid chapter id required",
      });
    }

    const allowedFields = ["chapter_number", "title", "release_date"];
    const filteredData = Object.keys(updateData)
      .filter((key) => allowedFields.includes(key))
      .reduce((obj, key) => {
        obj[key] = updateData[key];
        return obj;
      }, {});

    if (Object.keys(filteredData).length === 0) {
      return res.status(400).json({
        success: false,
        message: "No valid fields provided for update",
      });
    }

    if (filteredData.chapter_number) {
      filteredData.chapter_number = parseFloat(filteredData.chapter_number);
    }
    if (filteredData.title) {
      filteredData.title = filteredData.title.trim();
    }

    const updatedChapter = await updateChapterService(id, filteredData);
    logger.info("Chapter updated successfully", { chapterId: id });
    return res.status(200).json({
      success: true,
      message: "Chapter updated successfully.",
      data: updatedChapter,
    });
  } catch (error) {
    logger.error("Update Chapter Error: ", error);
    const statusCode = error.message === "Chapter not found" ? 404 : 500;
    return res.status(statusCode).json({
      success: false,
      message: error.message,
    });
  }
};

export const deleteChapter = async (req, res) => {
  try {
    const { id } = req.params;
    if (!id || isNaN(parseInt(id))) {
      return res.status(400).json({
        success: false,
        message: "Valid chapter id required",
      });
    }

    const result = await deleteChapterService(id);

    logger.info("Chapter deleted successfully", { chapterId: id });

    return res.status(200).json({
      success: true,
      message: "Chapter deleted successfully.",
    });
  } catch (error) {
    logger.error("Delete Chapter Error: ", error);
    const statusCode = error.message === "Chapter not found" ? 404 : 500;
    return res.status(statusCode).json({
      success: false,
      message: error.message,
    });
  }
};

export const createMultipleChapters = async (req, res) => {
  try {
    const { book_id, chapters } = req.body;

    const validation = validateMultipleChapters(chapters);

    if (!validation.isValid) {
      return res.status(400).json({
        success: false,
        message: validation.message,
      });
    }

    if (!book_id || !Number.isInteger(book_id) || book_id <= 0) {
      return res.status(400).json({
        success: false,
        message: "Valid book ID must be provided",
      });
    }

    const result = await createMultipleChaptersService(book_id, chapters);
    logger.info("Multiple chapters created successfully", {
      bookId: book_id,
      chapters,
    });
    return res.status(201).json({
      success: true,
      message: result.message,
      data: {
        totalCreated: result.chapters.length,
        chapters: result.chapters,
      },
    });
  } catch (error) {
    logger.error("Create Multiple Chapters Error: ", error);
    const statusCode = error.message === "Book not found" ? 404 : 500;
    return res.status(statusCode).json({
      success: false,
      message: error.message,
    });
  }
};

export const toggleChapterRead = async (req, res) => {
  try {
    const { bookId, chapter_number } = req.params;
    const { read, language } = req.body;
    const userId = req.user.id;

    const validation = validateReadedChapterData({
      book_id: bookId,
      chapter_number,
    });
    if (!validation.isValid) {
      return res.status(400).json({
        success: false,
        message: validation.message,
      });
    }

    const result = await toggleChapterReadService(
      userId,
      parseInt(bookId),
      parseFloat(chapter_number),
      read,
      language || "default"
    );

    logger.info("Chapter read status toggled", {
      userId,
      bookId,
      chapter_number,
      read,
      language,
    });

    return res.status(200).json({
      success: true,
      message: result.message,
      data: result.chapter,
    });
  } catch (error) {
    logger.error("Toggle Chapter Read Error: ", error);
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
