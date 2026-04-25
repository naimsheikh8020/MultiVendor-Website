export const validateRegister = (
  name: string,
  email: string,
  phone: string,
  password: string,
  confirmPassword: string
) => {
  if (!name || !email || !phone || !password || !confirmPassword) {
    return "All fields are required";
  }

  if (password !== confirmPassword) {
    return "Passwords do not match";
  }

  if (password.length < 6) {
    return "Password must be at least 6 characters";
  }

  return null;
};