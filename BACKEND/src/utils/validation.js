// validation.js
const validateRequired = (fields, data) => {
  const missing = fields.filter(f => !data[f]);
  if (missing.length) {
    throw new Error(`Missing required fields: ${missing.join(", ")}`);
  }
};

const validateEmail = (email) => {
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return re.test(email);
};

const validatePassword = (password) => {
  return typeof password === "string" && password.length >= 8;
};

module.exports = {
  validateRequired,
  validateEmail,
  validatePassword,
};
