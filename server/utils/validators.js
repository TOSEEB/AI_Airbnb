const validateSignupInput = ({ name, email, password }) => {
  if (!name || typeof name !== 'string' || name.trim().length < 2) {
    return { isValid: false, message: 'Name must be at least 2 characters long.' };
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!email || typeof email !== 'string' || !emailRegex.test(email.trim())) {
    return { isValid: false, message: 'Please provide a valid email address.' };
  }

  if (!password || typeof password !== 'string' || password.length < 6) {
    return { isValid: false, message: 'Password must be at least 6 characters long.' };
  }

  return { isValid: true, message: 'ok' };
};

const validateLoginInput = ({ email, password }) => {
  if (!email || typeof email !== 'string' || email.trim().length === 0) {
    return { isValid: false, message: 'Email is required.' };
  }

  if (!password || typeof password !== 'string' || password.length < 6) {
    return { isValid: false, message: 'Password must be at least 6 characters long.' };
  }

  return { isValid: true, message: 'ok' };
};

module.exports = {
  validateSignupInput,
  validateLoginInput,
};
