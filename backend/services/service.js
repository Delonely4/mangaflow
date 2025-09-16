import bcrypt from 'bcryptjs';
import prisma from '../models/prisma.js';
import { generateToken } from '../utils/jwt.js';

export const registerUser = async ({ username, email, password }) => {
    if (!username || !email || !password) {
        throw new Error('Username, email and password are required');
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
        throw new Error('Please provide a valid email address');
    }

    if (password.length < 6) {
        throw new Error('Password must be at least 6 characters long');
    }

    if (username.length < 3) {
        throw new Error('Username must be at least 3 characters long');
    }

    const existingUser = await prisma.user.findFirst({
        where: {
            OR: [{ email: email.toLowerCase() }, { username: username.toLowerCase() }]
        }
    });

    if (existingUser) {
        throw new Error('User with this email or username already exists');
    }

    const saltRounds = 12;
    const hashedPassword = await bcrypt.hash(password, saltRounds);

    const newUser = await prisma.user.create({
        data: { username: username.trim(), email: email.toLowerCase().trim(), password: hashedPassword },
        select: { id: true, username: true, email: true, avatar: true, created_at: true }
    });

    const token = generateToken(newUser.id);

    return { token, user: newUser };
};


export const loginUser = async ({ email, password }) => {
    if (!email || !password) {
        throw new Error('Email and password are required');
    }

    const user = await prisma.user.findUnique({ where: { email: email.toLowerCase() } });

    if (!user) {
        throw new Error('Invalid email or password');
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
        throw new Error('Invalid email or password');
    }

    const token = generateToken(user.id);

    return {
        token,
        user: { id: user.id, username: user.username, email: user.email, avatar: user.avatar, created_at: user.created_at }
    };
};
