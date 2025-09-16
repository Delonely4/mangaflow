import { registerUser, loginUser } from '../services/service.js';

export const register = async (req, res) => {
    try {
        const { username, email, password } = req.body;
        const { token, user } = await registerUser({ username, email, password });

        res.status(201).json({
            success: true,
            message: 'User registered successfully',
            token,
            user
        });
    } catch (error) {
        res.status(400).json({ success: false, message: error.message });
    }
};

export const login = async (req, res) => {
    try {
        const { email, password } = req.body;
        const { token, user } = await loginUser({ email, password });

        res.status(200).json({
            success: true,
            message: 'Login successful',
            token,
            user
        });
    } catch (error) {
        res.status(401).json({ success: false, message: error.message });
    }
};

export const protectedRoute = async (req, res) => {
    res.status(200).json({
        success: true,
        message: 'Hello MangaFlow!',
        data: { user: req.user, timestamp: new Date().toISOString(), serverMessage: 'You have accessed protected route!' }
    });
};
