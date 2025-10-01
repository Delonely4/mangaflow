export const validateChapterData = ({ book_id, number, title, release_date }) => {
    if (!book_id || !number) {
        return { isValid: false, message: 'Book ID and chapter number are required' };
    }

    if (!Number.isInteger(book_id) || book_id <= 0) {
        return { isValid: false, message: 'Book ID must be a positive integer' };
    }

    if (typeof number !== 'number' || number <= 0) {
        return { isValid: false, message: 'Chapter number must be a positive number' };
    }

    if (title && typeof title !== 'string') {
        return { isValid: false, message: 'Chapter title must be a string' };
    }

    if (release_date && isNaN(Date.parse(release_date))) {
        return { isValid: false, message: 'Invalid release date format' };
    }

    return { isValid: true };
};

export const validateMultipleChapters = (chapters) => {
    if (!Array.isArray(chapters) || chapters.length === 0) {
        return { isValid: false, message: 'Chapters array is required and must not be empty' };
    }

    if (chapters.length > 50) {
        return { isValid: false, message: 'Cannot create more than 50 chapters at once' };
    }

    for (let i = 0; i < chapters.length; i++) {
        const chapter = chapters[i];

        if (!chapter.number) {
            return { isValid: false, message: `Chapter ${i + 1}: number is required` };
        }

        if (typeof chapter.number !== 'number' || chapter.number <= 0) {
            return { isValid: false, message: `Chapter ${i + 1}: number must be a positive number` };
        }

        if (chapter.title && typeof chapter.title !== 'string') {
            return { isValid: false, message: `Chapter ${i + 1}: title must be a string` };
        }

        if (chapter.release_date && isNaN(Date.parse(chapter.release_date))) {
            return { isValid: false, message: `Chapter ${i + 1}: invalid release date format` };
        }
    }

    return { isValid: true };
};