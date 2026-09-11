export function errorHandler(
  error,
  req,
  res,
  next
) {
  void next;

  if (error?.code === 11000) {
    return res.status(409).json({
      success: false,
      code: "DUPLICATE_RESOURCE",
      message:
        "This operation has already been completed.",
    });
  }

  const statusCode =
    error.statusCode || 500;

  const code =
    typeof error.code === "string"
      ? error.code
      : "INTERNAL_SERVER_ERROR";

  const publicMessages = {
    GIVEAWAY_NOT_FOUND:
      "The requested giveaway could not be found.",

    GIVEAWAY_NOT_ACTIVE:
      "This giveaway is not currently open for participation.",

    GIVEAWAY_ENDED:
      "This giveaway has ended.",

    PRIZE_NOT_FOUND:
      "The selected prize could not be found.",

    USER_NOT_FOUND:
      "The requested user account could not be found.",

    ALREADY_PARTICIPATING:
      "You're already participating in this giveaway.",

    INSUFFICIENT_VE_BALANCE:
      "You don't have enough VEs to join this giveaway.",

    INSUFFICIENT_SVE_BALANCE:
      "You don't have enough SVEs to join this giveaway.",

    INSUFFICIENT_TOKEN_BALANCE:
      "You don't have enough Tokens to join this giveaway.",

    INVALID_CURRENCY:
      "The required wallet currency is unavailable.",

    PARTICIPATION_BLOCKED:
      "This participation request could not be completed.",

    CLAIM_NOT_ALLOWED:
      "You are not eligible to claim a prize for this giveaway.",

    CLAIM_ALREADY_SUBMITTED:
      "Your prize claim has already been submitted.",

    INVALID_CLAIM_DETAILS:
      "Please complete all required prize claim details.",

    INVALID_PHONE:
      "Please enter a valid phone number.",

    INVALID_PIN_CODE:
      "Please enter a valid 6-digit PIN code.",

    INVALID_EMAIL:
      "Please enter a valid email address.",

    INVALID_CLAIM_TYPE:
      "This prize claim type is not supported.",

    RATE_LIMITED:
      "Too many requests. Please try again shortly.",
  };

  if (statusCode >= 500) {
    console.error(
      `[${req.method}] ${req.originalUrl}`,
      error
    );
  }

  return res
    .status(statusCode)
    .json({
      success: false,
      code,

      message:
        publicMessages[code] ||
        "Something went wrong while processing the request.",
    });
}