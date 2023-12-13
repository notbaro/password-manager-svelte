/**
   * Maps Firebase authentication error codes to user-friendly error messages.
   * @param {string} code - The Firebase authentication error code.
   * @returns {string} - The corresponding user-friendly error message.
   */
export const errorCodeToMessage = (code: string): string => {
  switch (code) {
    case "auth/invalid-email":
      return "Invalid email";
    case "auth/user-disabled":
      return "User disabled";
    case "auth/user-not-found":
      return "User not found";
    case "auth/invalid-login-credentials":
      return "Wrong email/password";
    case "auth/missing-email":
      return "Please enter your email";
    case "auth/missing-password":
      return "Missing password";
    default:
      return code;
  }
};

