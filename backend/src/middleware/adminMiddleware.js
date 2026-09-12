export function requireAdmin(
  req,
  res,
  next
) {
  if (!req.user) {
    return res.status(401).json({
      success: false,
      code: "LOGIN_REQUIRED",
      message:
        "Please login before continuing.",
    });
  }

  if (req.user.role !== "ADMIN") {
    return res.status(403).json({
      success: false,
      code: "ADMIN_REQUIRED",
      message:
        "You are not authorized to perform this action.",
    });
  }

  return next();
}