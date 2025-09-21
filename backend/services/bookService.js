import prisma from '../models/prisma.js';

export const createBook = async ({
    name,
    cover_img,
    description,
    status,
    total_chapters,
    total_chapters_rus,
    total_chapters_eng }) => {
    const existingBook = await prisma.book.findUnique({
        where: { name }
    });

    if (existingBook) {
        throw new Error('Book with this name already exists');
    }

    const newBook = await prisma.book.create({
        data: {
            name,
            cover_img,
            description,
            status,
            current_chapter: 0,
            total_chapters,
            total_chapters_rus,
            total_chapters_eng
        }

        });
    return newBook;
};

export const getAllBooks = async ({ page = 1, limit = 10, search = '' }) => {
    const skip = (page - 1) * limit;
    const whereCondition = search ? {
        name: {
            contains: search,
            mode: 'insensitive'
        }
    } : {};

    const [books, totalCount] = await Promise.all([
        prisma.book.findMany({
            where: whereCondition,
            skip,
            take: limit,
            orderBy: { createdAt: 'desc' }
        }),
        prisma.book.count({where: whereCondition})
    ]);

    return {
        books,
        pagination: {
            currentPage: page,
            totalPages: Math.ceil(totalCount / limit),
            totalBooks: totalCount,
            hasNext: page * limit < totalCount,
            hasPrev: page > 1
        }
    };
};

export const getBookById = async (bookId) => {
    const book = await prisma.book.findUnique({
            where: { id: parseInt(bookId) },
            include: {
                chapters: {
                    orderBy: { number: 'asc' }
                },
                bookAuthors: {
                    include: {
                        author: true
                    }
                },
                bookGenres: {
                    include: {
                        genre: true
                    }
                }
            }
    });
        if (!book) {
            throw new Error('Book not found');
        }
        return book;
};

export const updateBook = async (bookId, updateData) => {
    const existingBook = await prisma.book.findUnique({
        where: { id: parseInt(bookId) },
    });

    if (!existingBook) {
        throw new Error('Book not found');
    }

    if (updateData.name && updateData.name !== existingBook.name) {
        const duplicateName = await prisma.book.findUnique({
            where: { name: updateData.name }
        });
        if (duplicateName) {
            throw new Error(`Book with this name already exists`);
        }
    }

    const updatedBook = await prisma.book.update({
        where: { id: parseInt(bookId) },
        data: updateData
        });

    return updatedBook;
};

export const deleteBook = async (bookId) => {
    const existingBook = await prisma.book.findUnique({
        where: { id: parseInt(bookId) },
    });

    if (!existingBook) {
        throw new Error('Book not found');
    }

    await prisma.book.delete({
        where: { id: parseInt(bookId) },
    });

    return { message: 'Book deleted successfully'};
};



