export const validateRegistrationData = ({ username, email, password }) => {
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

export const validateLoginData = ({ email, password }) => {
    if (!email || !password) {
        return { isValid: false, messsage: 'Email and password are required' };
    }

    return { isValid: true };
};