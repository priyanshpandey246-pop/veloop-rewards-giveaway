import IdempotencyKey from "../models/IdempotencyKey.js";

export async function requireIdempotencyKey(
  req,
  res,
  next
) {
  try {
    const key =
      req.headers[
        "x-idempotency-key"
      ];

    if (
      !key ||
      typeof key !== "string" ||
      key.length < 8 ||
      key.length > 200
    ) {
      return res.status(400).json({
        success: false,
        code:
          "IDEMPOTENCY_KEY_REQUIRED",
        message:
          "A valid request identifier is required.",
      });
    }

    const operation =
      `${req.method}:${req.baseUrl}${req.route.path}`;

    const existing =
      await IdempotencyKey.findOne({
        key,
        userId:
          req.user.userId,
        operation,
      }).lean();

    if (existing) {
      if (
        existing.status ===
          "COMPLETED" &&
        existing.responseBody
      ) {
        return res
          .status(
            existing.responseStatus ||
              200
          )
          .json(
            existing.responseBody
          );
      }

      return res.status(409).json({
        success: false,
        code:
          "REQUEST_IN_PROGRESS",
        message:
          "This participation request is already being processed.",
      });
    }

    const record =
      await IdempotencyKey.create({
        key,

        userId:
          req.user.userId,

        operation,

        status:
          "PROCESSING",

        expiresAt:
          new Date(
            Date.now() +
              24 *
                60 *
                60 *
                1000
          ),
      });

    req.idempotencyRecord =
      record;

    return next();
  } catch (error) {
    if (error?.code === 11000) {
      return res.status(409).json({
        success: false,
        code:
          "REQUEST_IN_PROGRESS",
        message:
          "This participation request is already being processed.",
      });
    }

    return next(error);
  }
}