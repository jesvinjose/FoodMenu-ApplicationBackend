export const isValidEmail = (email) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

export const isValidPassword = (password) => {
  return password.length >= 6;
};

export const isValidCategory = (category) => {
  const validCategories = [
    "Indian",
    "Chinese",
    "Thai",
    "Arabian",
    "Shakes & IceCreams",
  ];
  return validCategories.includes(category);
};
