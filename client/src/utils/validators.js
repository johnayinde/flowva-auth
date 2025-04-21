/**
 * Validates an email address
 * @param {string} email - The email to validate
 * @returns {boolean} - Whether the email is valid
 */
export const validateEmail = (email) => {
  const re =
    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(String(email).toLowerCase());
};

/**
 * Calculates the strength of a password
 * @param {string} password - The password to evaluate
 * @returns {object} - The strength assessment
 */
export const calculatePasswordStrength = (password) => {
  // Default response
  const response = {
    strength: 0, // 0: weak, 1: medium, 2: strong
    message: "",
    valid: false,
  };

  if (!password) {
    return response;
  }

  let points = 0;

  // Length check
  if (password.length >= 8) points++;

  // Contains both lower and uppercase characters
  if (password.match(/([a-z].*[A-Z])|([A-Z].*[a-z])/)) points++;

  // Contains numbers
  if (password.match(/([0-9])/)) points++;

  // Contains special chars
  if (password.match(/([!,%,&,@,#,$,^,*,?,_,~])/)) points++;

  // Set strength based on points
  if (password.length < 6) {
    response.strength = 0;
    response.message = "Weak password";
    response.valid = false;
  } else if (points <= 2) {
    response.strength = 1;
    response.message = "Medium strength password";
    response.valid = true;
  } else {
    response.strength = 2;
    response.message = "Strong password";
    response.valid = true;
  }

  return response;
};

/**
 * Validates form data for sign up
 * @param {object} data - The form data to validate
 * @returns {object} - Object containing validation errors
 */
export const validateSignUpForm = (data) => {
  const errors = {};

  // Email validation
  if (!data.email) {
    errors.email = "Email is required";
  } else if (!validateEmail(data.email)) {
    errors.email = "Email is invalid";
  }

  // Password validation
  if (!data.password) {
    errors.password = "Password is required";
  } else if (data.password.length < 8) {
    errors.password = "Password must be at least 8 characters";
  }

  // Confirm password validation
  if (!data.confirmPassword) {
    errors.confirmPassword = "Please confirm your password";
  } else if (data.confirmPassword !== data.password) {
    errors.confirmPassword = "Passwords do not match";
  }

  return errors;
};
