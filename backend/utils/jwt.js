import jwt from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET || 'mangaflow_secret_key_change_this';

export const generateToken = (userId) => {
    return jwt.sign({ userId, timestamp: Date.now() }, JWT_SECRET, { expiresIn: '7d' });
};

export const verifyToken = (token) => {
    return jwt.verify(token, JWT_SECRET);
};
