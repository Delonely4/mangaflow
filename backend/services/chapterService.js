import prisma from '../models/prisma.js';

export const createChapter = async ({
    book_id,
    chapter_number,
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
            chapter_number
        }
    });

    if (existingChapter) {
        throw new Error('Chapter already exists');
    }

    const newChapter = await prisma.chapter.create({
        data: {
            book_id,
            chapter_number,
            title: title || `Chapter ${chapter_number}`,
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
        orderBy: { chapter_number: 'asc' },
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
        select: { chapter_number: true, created_at: true, language: true }
        });

    const readMap = new Map(read.map(
        r => [String(r.chapter_number), r]));

    const chaptersWithRead = chapters.map (ch => {
        const readRecord = readMap.get(String(ch.chapter_number));
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

export const markChapterAsRead = async (userId, bookId, chapter_number, language = 'default') => {
    try {
        const uniqueKey = {
            book_id: parseInt(bookId),
            user_id: userId,
            chapter_number: parseFloat(chapter_number),
        };

        const existing = await prisma.readedChapter.findUnique({
            where: {
                book_id_user_id_chapter_number: uniqueKey
            }
        });

        if (existing) {
            await prisma.readedChapter.delete({
                where: {
                    book_id_user_id_chapter_number: uniqueKey
                }
            });

            return {
                message: 'Chapter marked as unread',
                chapter: null,
                isRead: false
            };
        }

        const created = await prisma.readedChapter.create({
            data: {
                book_id_user_id_chapter_number: uniqueKey,
                language
            }
        });

        return {
            message: 'Chapter was marked as read',
            chapter: created,
            isRead: true
        };
    } catch (error) {
    console.log('Error marking chapter', error);
    throw new Error('Failed to update chapter read status');
    }
};








export const updateChapter = async (chapterId, updateData) => {
    const existingChapter = await prisma.chapter.findUnique({
        where: {id: parseInt(chapterId)}
    });

    if (!existingChapter) {
        throw new Error('Chapter not found');
    }

    if (updateData.chapter_number && updateData.chapter_number !== existingChapter.chapter_number ) {
        const duplicateChapter = await prisma.chapter.findFirst({
            where: {
                book_id: existingChapter.book_id,
                chapter_number: updateData.chapter_number
            }
        });

        if(duplicateChapter){
            throw new Error(`Chapter ${updateData.chapter_number} already exists for this book`);
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
            chapter_number: { in: chapterNumbers }
        }
    });

    if(existingChapters.length > 0) {
        const existingNumbers = existingChapters.map(ch => ch.number);
        throw new Error(`Chapters with numbers ${existingNumbers.join(', ')} already exist`);
    }

    const chaptersData = chapters.map(chapter => ({
        book_id,
        chapter_number: chapter.number,
        title: chapter.title || `Chapter ${chapter.number}`,
        release_date: chapter.release_date ? new Date(chapter.release_date) : new Date()
    }));

    const createdChapters = await prisma.chapter.createMany({
        data: chaptersData
    });

    const newChapters = await prisma.chapter.findMany({
        where: {
            book_id,
            chapter_number: { in: chapterNumbers }
        },
        orderBy: { chapter_number: 'asc' },
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






