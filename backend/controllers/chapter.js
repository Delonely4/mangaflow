import {
    createChapter as createChapterService,
    getChaptersByBookId as getChaptersByBookIdService,
    updateChapter as updateChapterService,
    deleteChapter as deleteChapterService,
    createMultipleChapters as createMultipleChaptersService,
} from "../services/chapterService.js";

import { validateChapterData, validateMultipleChapters } from '../validators/validateChapter.js';

export const createChapter = async (req, res) => {
    try {
        const {book_id, number, title, release_date} = req.body;

        const validation = validateChapterData({book_id, number, title, release_date});

        if (!validation.isValid) {
            return res.status(400).json({
                success: false,
                message: validation.message
            })
        }

        const newChapter = await createChapterService({
            book_id: parseInt(book_id),
            number: parseFloat(number),
            title: title?.trim(),
            release_date
        });
        return res.status(201).json({
            success: true,
            message: 'Chapter created successfully.',
            data: newChapter
        });
    } catch (error) {
        return res.status(400).json({
            success: false,
            message: error.message
        });
    }
};

export const getChaptersByBookId = async (req, res) => {
    try {
        const {bookId} = req.params;

        if (!bookId || isNaN(parseInt(bookId))) {
            return res.status(400).json({
                success: false,
                message: 'Valid book ID must be provided'
            });
        }

        const result = await getChaptersByBookIdService(bookId);
        return res.status(200).json({
            success: true,
            message: 'Chapter gets successfully.',
            data: result
        });
    } catch (error) {
        const statusCode = error.message === 'Book not found' ? 404 : 500;
        return res.status(statusCode).json({
            success: false,
            message: error.message
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
                message: 'Valid chapter id required'
            });
        }

        const allowedFields = ['number', 'title', 'release_date'];
        const filteredData = Object.keys(updateData)
            .filter(key => allowedFields.includes(key))
            .reduce((obj, key) => {
                obj[key] = updateData[key];
                return obj;
            }, {});

        if (Object.keys(filteredData).length === 0) {
            return res.status(400).json({
                success: false,
                message: 'No valid fields provided for update'
            });

        }

        if (filteredData.number) {
            filteredData.number = parseFloat(filteredData.number);
        }
        if (filteredData.title) {
            filteredData.title = filteredData.title.trim();
        }

        const updatedChapter = await updateChapterService(id, filteredData);
            return res.status(200).json({
                success: true,
                message: 'Chapter updated successfully.',
                data: updatedChapter
            });

    } catch (error) {
        const statusCode = error.message === 'Chapter not found' ? 404 : 500;
        return res.status(statusCode).json({
            success: false,
            message: error.message
        });
    }
};

export const deleteChapter = async (req, res) => {
    try {
        const { id } = req.params;
        if(!id || isNaN(parseInt(id))) {
            return res.status(400).json({
                success: false,
                message: 'Valid chapter id required'
            });
        }

        const result = await deleteChapterService(id);

        return res.status(200).json({
        success: true,
        message: 'Chapter deleted successfully.'
        });
    } catch (error) {
        const statusCode = error.message === 'Chapter not found' ? 404 : 500;
        return res.status(statusCode).json({
            success: false,
            message: error.message
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
                message: validation.message
            });
        }

        if(!book_id || !Number.isInteger(book_id) || book_id <=0) {
            return res.status(400).json({
                success: false,
                message: 'Valid book ID must be provided'
            });
        }

        const result = await createMultipleChaptersService( book_id, chapters );
        return res.status(201).json({
            success: true,
            message: result.message,
            data: {
                totalCreated: result.chapters.length,
                chapters: result.chapters
            }
        });

    } catch (error) {
        const statusCode = error.message === 'Book not found' ? 404 : 500;
        return res.status(statusCode).json({
            success: false,
            message: error.message
        })
    }
};

