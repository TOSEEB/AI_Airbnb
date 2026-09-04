const AUTH_PREFIXES = [
  "/login",
  "/register",
  "/verify-otp",
  "/forgot-password",
  "/reset-password",
];

export const getReturnPath = (from) => {
  if (!from || typeof from !== "string") {
    return "/";
  }

  if (!from.startsWith("/") || from.startsWith("//")) {
    return "/";
  }

  const pathname = from.split("?")[0];

  if (AUTH_PREFIXES.some((prefix) => pathname.startsWith(prefix))) {
    return "/";
  }

  return from;
};

export const locationToPath = (location) => {
  if (!location?.pathname) {
    return "/";
  }

  return `${location.pathname}${location.search || ""}`;
};
