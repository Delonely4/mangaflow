import { registerUser, loginUser } from '../services/userService.js';

import { validateRegistrationData, validateLoginData } from '../validators/validateUser.js';

export const register = async (req, res) => {
    try {
        const { username, email, password } = req.body;
        const validation = validateRegistrationData({ username, email, password });
        if (!validation.isValid) {
            return res.status(400).json({
                success: false,
                message: validation.message
            })
        }
        const { token, user } = await registerUser(
            { username, email, password });

        res.cookie('token', token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'lax',
            maxAge: 7 * 24 * 60 * 60 * 1000
        })

        res.status(201).json({
            success: true,
            message: 'User registered successfully',
            user
        });
    } catch (error) {
        res.status(400).json({ success: false, message: error.message });
    }
};

export const login = async (req, res) => {
    try {
        const { email, password } = req.body;
        const validation = validateLoginData({ email, password });
        if (!validation.isValid) {
            return res.status(400).json({
                success: false,
                message: validation.message
            })
        }

        const { token, user } = await loginUser({ email, password });

        res.cookie('token', token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'lax',
            maxAge: 7 * 24 * 60 * 60 * 1000
        })

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

export const logout = async (req, res) => {
    try {
        res.clearCookie('token', {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'lax'
        })

        res.status(200).json({
            success: true,
            message: 'Logout successful'
        })
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

export const protectedRoute = async (req, res) => {
    res.status(200).json({
        success: true,
        message: 'Hello MangaFlow!',
        data: { user: req.user,
            timestamp: new Date().toISOString(),
            serverMessage: 'You have accessed protected route!' }
    });
};
