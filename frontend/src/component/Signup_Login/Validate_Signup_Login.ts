export const Validate_Username = (username: string): string[] => {
  const errors: string[] = [];

  if (!username.trim()) {
    errors.push("- Username is required.");
  }

  return errors;
};

export const Validate_Email = (email: string): string[] => {
  const errors: string[] = [];
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  if (!email) {
    errors.push("- Email is required.");
  } else if (!emailRegex.test(email)) {
    errors.push("- Email format is invalid.");
  }

  return errors;
};

export const Validate_Password = (password: string): string[] => {
  const errors: string[] = [];

  if (!password) {
    errors.push("- Password is required.");
  } else if (password.length < 6) {
    errors.push("- Password must be at least 6 characters long.");
  }

  return errors;
};

export const Validate_Role = (role: string): string[] => {
  const errors: string[] = [];

  if (!role) {
    errors.push("- Please select a role.");
  }

  return errors;
};
