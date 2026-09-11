import jwt from "jsonwebtoken";

import User from "../models/User.js";

export async function createDemoSession(
  req,
  res,
  next
) {
  try {
    const demoAuthEnabled =
      process.env.ENABLE_DEMO_AUTH ===
      "true";

    if (!demoAuthEnabled) {
      return res.status(404).json({
        success: false,
        code: "ROUTE_NOT_FOUND",
        message:
          "The requested endpoint was not found.",
      });
    }

    const user =
      await User.findOne({
        userId: "VE10025",
      }).lean();

    if (!user) {
      return res.status(404).json({
        success: false,
        code:
          "DEMO_USER_NOT_FOUND",
        message:
          "Development user is unavailable.",
      });
    }

    const token = jwt.sign(
      {
        userId: user.userId,
        role: user.role,
      },
      process.env.JWT_SECRET,
      {
        expiresIn: "2h",
      }
    );

    return res.status(200).json({
      success: true,
      data: {
        token,
        user: {
          userId: user.userId,
          displayName:
            user.displayName,
          balances:
            user.balances,
        },
      },
    });
  } catch (error) {
    return next(error);
  }
}