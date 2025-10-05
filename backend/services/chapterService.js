import prisma from '../models/prisma.js';

export const createChapter = async ({
    book_id,
    number,
    title,
    release_date,
}) => {
    const book = await prisma.book.findUnique({
        where: { id: book_id },
    });

    if (!book) {
        throw new Error('Book not found');
    }

    const existingChapter = await prisma.chapter.findFirst({
        where: {
            book_id,
            number
        }
    });

    if (existingChapter) {
        throw new Error('Chapter already exists');
    }

    const newChapter = await prisma.chapter.create({
        data: {
            book_id,
            number,
            title: title || `Chapter ${number}`,
            release_date: release_date ? new Date(release_date) : new Date()
        },
        include: {
            book: {
                select: { id: true, name: true }
            }

        }

    });

    return newChapter;
};

export const getChaptersByBookId = async (bookId, userId = null) => {
    const book = await prisma.book.findUnique({
        where: {
            id: parseInt(bookId)
        }
    });

    if (!book) {
        throw new Error('Book not found');
    }

    const chapters = await prisma.chapter.findMany({
        where: { book_id: parseInt(bookId) },
        orderBy: { number: 'asc' },
        include: {
            book: {
                select: { id: true, name: true }
            }
        }
    });

    if(!userId) {
        return { book: { id: book.id, name: book.name }, chapters};
    }

    const read = await prisma.readedChapter.findMany({
        where: { book_id: parseInt(bookId), user_id: userId },
        select: { number: true, created_at: true, language: true }
        });

    const readMap = new Map(read.map(
        r => [String(r.number), r]));

    const chaptersWithRead = chapters.map (ch => {
        const readRecord = readMap.get(String(ch.number));
        return {
            ...ch,
            read: Boolean(readRecord),
            read_at: readRecord ? readRecord.created_at : null,
            read_language: readRecord ? readRecord.language : null
        };
    });

    return {
        book: {
            id: book.id,
            name: book.name
        },

        chapters: chaptersWithRead
    };
};

export const markChapterAsRead = async (userId, bookId, number, isRead = true, language = 'default') => {
    const existing = await prisma.readedChapter.findUnique({
        where: {
            book_id_user_id_number: {
                book_id: parseInt(bookId),
                user_id: userId,
                number: parseFloat(number),
            }
        }
    });

    if (isRead) {
        if(existing) {
            return {
                message: 'Chapter already marked as read',
                chapter: existing
            };
        }
        const created = prisma.readedChapter.create({
            data: {
                user_id: userId,
                book_id: parseInt(bookId),
                number: parseFloat(number),
                language
            }
        });
        return {
            message: 'Chapter marked as read',
            chapter: created
        };
    } else {
        if(existing) {
            await prisma.readedChapter.delete({
                where: {
                    book_id_user_id_number: {
                        book_id: parseInt(bookId),
                        user_id: userId,
                        number: parseFloat(number),
                    }
                }
            });
            return {
                message: 'Chapter marked as read',
                chapter: null
            };
        }
        return {
            message: 'Chapter was not marked as read',
            chapter: null
        };
    }
};

export const updateChapter = async (chapterId, updateData) => {
    const existingChapter = await prisma.chapter.findUnique({
        where: {id: parseInt(chapterId)}
    });

    if (!existingChapter) {
        throw new Error('Chapter not found');
    }

    if (updateData.number && updateData.number !== existingChapter.number ) {
        const duplicateChapter = await prisma.chapter.findFirst({
            where: {
                book_id: existingChapter.book_id,
                number: updateData.number
            }
        });

        if(duplicateChapter){
            throw new Error(`Chapter ${updateData.number} already exists for this book`);
        }
    }

    if (updateData.release_date) {
        updateData.release_date = new Date(updateData.release_date);
    }

    const updatedChapter = await prisma.chapter.update({
        where: { id: parseInt(chapterId) },
        data: updateData,
        include: {
            book: {
                select: { id: true, name: true }
            }
        }
    });

    return updatedChapter;
};

export const deleteChapter = async (chapterId) => {
    const existingChapter = await prisma.chapter.findUnique({
        where: {id: parseInt(chapterId)}
    });

    if (!existingChapter) {
        throw new Error('Chapter not found');
    }

    await prisma.chapter.delete({
        where: { id: parseInt(chapterId) }
    });

    return { message: 'Chapter deleted successfully' };
};

export const createMultipleChapters = async (book_id, chapters) => {
    const book = await prisma.book.findUnique({
        where: { id: book_id}
    });

    if (!book) {
        throw new Error('Book not found');
    }

    const chapterNumbers = chapters.map(ch => ch.number);
    const uniqueNumbers = [...new Set(chapterNumbers)];

    if (chapterNumbers.length !== uniqueNumbers.length) {
    throw new Error('Chapter numbers must be unique');
    }

    const existingChapters = await prisma.chapter.findMany({
        where: {
            book_id,
            number: { in: chapterNumbers }
        }
    });

    if(existingChapters.length > 0) {
        const existingNumbers = existingChapters.map(ch => ch.number);
        throw new Error(`Chapters with numbers ${existingNumbers.join(', ')} already exist`);
    }

    const chaptersData = chapters.map(chapter => ({
        book_id,
        number: chapter.number,
        title: chapter.title || `Chapter ${chapter.number}`,
        release_date: chapter.release_date ? new Date(chapter.release_date) : new Date()
    }));

    const createdChapters = await prisma.chapter.createMany({
        data: chaptersData
    });

    const newChapters = await prisma.chapter.findMany({
        where: {
            book_id,
            number: { in: chapterNumbers }
        },
        orderBy: { number: 'asc' },
        include: {
            book: {
                select: { id: true, name: true }
            }
        }
    });

    return {
        message: `${createdChapters.count} chapters created successfully`,
        chapters: newChapters
    };
};






