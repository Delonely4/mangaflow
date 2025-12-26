import {
  createBook as createBookService,
  getAllBooks as getAllBooksService,
  getBookById as getBookByIdService,
  updateBook as updateBookService,
  deleteBook as deleteBookService,
} from "../services/bookService.js";
import logger from "../utils/logger.js";

import { validateBookData } from "../validators/validateBook.js";

export const createBook = async (req, res) => {
  try {
    const {
      name,
      cover_img,
      description,
      status,
      total_chapters,
      total_chapters_rus,
      total_chapters_eng,
    } = req.body;

    const validation = validateBookData({
      name,
      cover_img,
      description,
      status,
      total_chapters,
      total_chapters_rus,
      total_chapters_eng,
    });

    if (!validation.isValid) {
      
      return res.status(400).json({
        success: false,
        message: validation.message,
      });
    }

    const newBook = await createBookService({
      name: name.trim(),
      cover_img: cover_img.trim(),
      description: description.trim(),
      status: status.toLowerCase(),
      total_chapters: total_chapters || 0,
      total_chapters_rus: total_chapters_rus || 0,
      total_chapters_eng: total_chapters_eng || 0,
    });

    logger.info("Book created successfully", { bookId: newBook.id });

    return res.status(201).json({
      success: true,
      message: "Book created successfully",
      data: newBook,
    });
  } catch (error) {
    logger.error("Create Book Error: ", error);
    return res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

export const getAllBooks = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const search = req.query.search || "";

    if (page < 1 || limit < 1 || limit > 100) {
      return res.status(400).json({
        success: false,
        message:
          "Invalid pagination parameters. Page must be >= 1, limit between 1 and 100",
      });
    }

    const result = await getAllBooksService({ page, limit, search });
    logger.info("Books retrieved successfully", { page, limit, search });

    return res.status(200).json({
      success: true,
      message: "Books retrieved successfully",
      data: result,
    });
  } catch (error) {
    logger.error("Get All Books Error: ", error);
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const getBookById = async (req, res) => {
  try {
    const { id } = req.params;

    if (!id || isNaN(parseInt(id))) {
      return res.status(400).json({
        success: false,
        message: "Valid book ID is required",
      });
    }

    const book = await getBookByIdService(id);
    logger.info("Book retrieved successfully", { bookId: id });

    return res.status(200).json({
      success: true,
      message: "Book retrieved successfully",
      data: book,
    });
  } catch (error) {
    logger.error("Get Book By ID Error: ", error);
    const statusCode = error.message === "Book not found" ? 404 : 500;
    return res.status(statusCode).json({
      success: false,
      message: error.message,
    });
  }
};

export const updateBook = async (req, res) => {
  try {
    const { id } = req.params;
    let updateData = req.body;

    if (!id || isNaN(parseInt(id))) {
      return res.status(400).json({
        success: false,
        message: "Valid book ID is required",
      });
    }

    if (Object.keys(updateData).length > 0) {
      const allowedFields = [
        "name",
        "cover_img",
        "description",
        "status",
        "total_chapters",
        "total_chapters_rus",
        "total_chapters_eng",
      ];

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

      updateData = filteredData;
    }

    const updatedBook = await updateBookService(id, updateData);
    logger.info("Book updated successfully", { bookId: id });

    return res.status(200).json({
      success: true,
      message: "Book updated successfully",
      data: updatedBook,
    });
  } catch (error) {
    logger.error("Update Book Error: ", error);
    const statusCode = error.message === "Book not found" ? 404 : 500;
    return res.status(statusCode).json({
      success: false,
      message: error.message,
    });
  }
};

export const deleteBook = async (req, res) => {
  try {
    const { id } = req.params;

    if (!id || isNaN(parseInt(id))) {
      return res.status(400).json({
        success: false,
        message: "Valid book ID is required",
      });
    }

    const result = await deleteBookService(id);
    logger.info("Book deleted successfully", { bookId: id });

    return res.status(200).json({
      success: true,
      message: result.message,
    });
  } catch (error) {
    logger.error("Delete Book Error: ", error);
    const statusCode = error.message === "Book not found" ? 404 : 500;
    return res.status(statusCode).json({
      success: false,
      message: error.message,
    });
  }
};
