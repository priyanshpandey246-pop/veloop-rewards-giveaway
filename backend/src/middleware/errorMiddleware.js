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
            code: "ALREADY_PARTICIPATING",
            message: "You're already participating in this giveaway.",
        });
    }
    const statusCode =
    error.statusCode || 500;

    const code = 
    error.code || 
    "INTERNAL_SERVER_ERROR";

    const publicMessages = {
        GIVEAWAY_NOT_FOUND:
        "The requested giveaway could not be found.",

        GIVEAWAY_NOT_ACTIVE:
        "This giveaway is not currently open for participation.",

        GIVEAWAY_ENDED:
        "This giveaway has ended.",

         PRIZE_NOT_FOUND:
      "The selected prize could not be found.",

    ALREADY_PARTICIPATING:
      "You're already participating in this giveaway.",

    INSUFFICIENT_VE_BALANCE:
      "You don't have enough VEs to join this giveaway.",

    INSUFFICIENT_SVE_BALANCE:
      "You don't have enough SVEs to join this giveaway.",

    INSUFFICIENT_TOKEN_BALANCE:
      "You don't have enough Tokens to join this giveaway.",

    PARTICIPATION_BLOCKED:
      "This participation request could not be completed.",

    INVALID_CURRENCY:
      "The required wallet currency is unavailable.",
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
        message: publicMessage[code] || 
        "Something went wrong while processing the request.",
    });
}