import { registerUser, loginUser } from '../services/service.js';

const validateRegistrationData = ({ username, email, password }) => {
    if (!username || !email || !password) {
        return { isValid: false, message: 'Username, email and password are required' };
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
        return { isValid: false, message: 'Please provide a valid email address' };
    }

    if (password.length < 6) {
        return { isValid: false, message: 'Password must be at least 6 characters long' };
    }

    if (username.length < 3) {
        return { isValid: false, message: 'Username must be at least 3 characters long' };
    }
    return { isValid: true };
}

const validateLoginData = ({ email, password }) => {
    if (!email || !password) {
        return { isValid: false, messsage: 'Email and password are required' };
    }

    return { isValid: true };
}

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
        const validation = validateLoginData({ email, password });
        if (!validation.isValid) {
            return res.status(400).json({
                success: false,
                message: validation.message
            })
        }

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
        data: { user: req.user,
            timestamp: new Date().toISOString(),
            serverMessage: 'You have accessed protected route!' }
    });
};
