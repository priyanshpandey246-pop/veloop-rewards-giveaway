import {
  rateLimit,
} from "express-rate-limit";

export const participationLimiter =
  rateLimit({
    windowMs: 60 * 1000,
    limit: 10,

    standardHeaders: "draft-8",
    legacyHeaders: false,

    message: {
      success: false,
      code: "RATE_LIMITED",
      message:
        "Too many participation requests. Please try again shortly.",
    },
  });

export const claimLimiter =
  rateLimit({
    windowMs: 60 * 1000,
    limit: 5,

    standardHeaders: "draft-8",
    legacyHeaders: false,

    message: {
      success: false,
      code: "RATE_LIMITED",
      message:
        "Too many claim requests. Please try again shortly.",
    },
  });

export const authLimiter =
  rateLimit({
    windowMs: 60 * 1000,
    limit: 15,

    standardHeaders: "draft-8",
    legacyHeaders: false,

    message: {
      success: false,
      code: "RATE_LIMITED",
      message:
        "Too many authentication requests. Please try again shortly.",
    },
  });