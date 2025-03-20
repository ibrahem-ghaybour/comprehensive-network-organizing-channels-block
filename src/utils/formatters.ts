/**
 * Format a date string to a localized date format
 * @param dateString ISO date string
 * @param options Intl.DateTimeFormatOptions
 * @returns Formatted date string
 */
export function formatDate(
  dateString: string | null | undefined,
  options: Intl.DateTimeFormatOptions = {
    year: "numeric",
    month: "short",
    day: "numeric",
  }
): string {
  if (!dateString) return "N/A";

  try {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat("en-US", options).format(date);
  } catch (error) {
    console.error("Error formatting date:", error);
    return dateString;
  }
}

/**
 * Format a date string to a relative time format (e.g., "2 days ago")
 * @param dateString ISO date string
 * @returns Relative time string
 */
export function formatRelativeTime(
  dateString: string | null | undefined
): string {
  if (!dateString) return "Never";

  try {
    const date = new Date(dateString);
    const now = new Date();
    const diffInSeconds = Math.floor((now.getTime() - date.getTime()) / 1000);

    // Less than a minute
    if (diffInSeconds < 60) {
      return "Just now";
    }

    // Less than an hour
    if (diffInSeconds < 3600) {
      const minutes = Math.floor(diffInSeconds / 60);
      return `${minutes} minute${minutes !== 1 ? "s" : ""} ago`;
    }

    // Less than a day
    if (diffInSeconds < 86400) {
      const hours = Math.floor(diffInSeconds / 3600);
      return `${hours} hour${hours !== 1 ? "s" : ""} ago`;
    }

    // Less than a week
    if (diffInSeconds < 604800) {
      const days = Math.floor(diffInSeconds / 86400);
      return `${days} day${days !== 1 ? "s" : ""} ago`;
    }

    // Less than a month
    if (diffInSeconds < 2592000) {
      const weeks = Math.floor(diffInSeconds / 604800);
      return `${weeks} week${weeks !== 1 ? "s" : ""} ago`;
    }

    // Less than a year
    if (diffInSeconds < 31536000) {
      const months = Math.floor(diffInSeconds / 2592000);
      return `${months} month${months !== 1 ? "s" : ""} ago`;
    }

    // More than a year
    const years = Math.floor(diffInSeconds / 31536000);
    return `${years} year${years !== 1 ? "s" : ""} ago`;
  } catch (error) {
    console.error("Error formatting relative time:", error);
    return dateString;
  }
}

/**
 * Format a user's full name
 * @param firstName First name
 * @param lastName Last name
 * @returns Full name
 */
export function formatFullName(firstName: string, lastName: string): string {
  return `${firstName} ${lastName}`;
}

/**
 * Format a number with commas as thousands separators
 * @param value Number to format
 * @returns Formatted number string
 */
export function formatNumber(value: number): string {
  return new Intl.NumberFormat("en-US").format(value);
}

/**
 * Capitalize the first letter of a string
 * @param str String to capitalize
 * @returns Capitalized string
 */
export function capitalize(str: string): string {
  if (!str) return "";
  return str.charAt(0).toUpperCase() + str.slice(1);
}

/**
 * Truncate a string to a specified length and add ellipsis if needed
 * @param str String to truncate
 * @param maxLength Maximum length
 * @returns Truncated string
 */
export function truncate(str: string, maxLength: number): string {
  if (!str || str.length <= maxLength) return str;
  return str.slice(0, maxLength) + "...";
}

export function validatePassword(password: string): {
  valid: boolean;
  message: string;
} {
  const { $i18n } = useNuxtApp();
  const minLength = 8;
  const uppercaseRegex = /[A-Z]/;
  const lowercaseRegex = /[a-z]/;
  const digitRegex = /\d/;
  const specialCharRegex = /[!@#$%^&*(),.?":{}|<>]/;

  if (password.length < minLength) {
    return {
      valid: false,
      message: `${$i18n.t("auth.passwordLenght")}`,
    };
  }
  if (!uppercaseRegex.test(password)) {
    return {
      valid: false,
      message: `${$i18n.t("auth.passwordUppercase")}`,
    };
  }
  if (!lowercaseRegex.test(password)) {
    return {
      valid: false,
      message: `${$i18n.t("auth.passwordLowercase")}`,
    };
  }
  if (!digitRegex.test(password)) {
    return {
      valid: false,
      message: `${$i18n.t("auth.passwordDigit")}`,
    };
  }
  if (!specialCharRegex.test(password)) {
    return {
      valid: false,
      message: `${$i18n.t("auth.passwordSpecialChar")}`,
    };
  }

  return { valid: true, message: `${$i18n.t("auth.passwordValid")}` };
}
export function validateEmail(email: string): {
  valid: boolean;
  message: string;
} {
  const { $i18n } = useNuxtApp();
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  if (!emailRegex.test(email)) {
    return { valid: false, message: `${$i18n.t("auth.emailInvalid")}` };
  }

  return { valid: true, message:`${$i18n.t("auth.emailValid")}` };
}
