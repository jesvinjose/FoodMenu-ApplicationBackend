// Email Validation Function
export const isValidEmail = (email) => {
    // Regular expression for email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
};

// Password Validation Function
export const isValidPassword = (password) => {
    // Password should have at least 8 characters
    // You can customize this as per your requirements
    return password.length >= 6;
};