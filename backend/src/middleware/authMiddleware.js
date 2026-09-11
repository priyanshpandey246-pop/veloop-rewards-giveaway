import jwt from "jsonwebtoken";
import User from "../models/User.js";
export async function requireAuth(
    req,
    res,
    next
) {
    try {
        const authorization =
        req.headers.authorization;

        if (
            !authorization || 
            !authorization.startsWith(
                "Bearer"
            )
        ) {
            return res.status(401).json({
                success: false,
                code: "LOGIN_REQUIRED",
                message: "Please login before continuing.",
            });
        }

        const token = authorization.split(" ")[1];

        if (!token) {
            return res.status(401).json({
                success: false,
                code: "LOGIN_REQUIRED",
                message: "Authentication token is missing.",
            });
        }

        const decoded = jwt.verify(
            token,
            process.env.JWT_SECRET
        );

        const user =
        await User.findOne({
            userId: decoded.userId,
        }).lean();

        if (!user) {
            return res.status(401).json ({
                success: false,
                code: "USER_NOT_FOUND",
                message: "The authenticated account could not be found.",
            });
        }

        if (
            user.accountStatus !==
            "ACTIVE"
        ) {
            return res.status(403).json({
                 success: false,
        code: "ACCOUNT_NOT_ACTIVE",
        message:
          "This account cannot participate at this time.",
            })
        }

        req.user = user;
        return next();
    } catch (error) {
        if (
            error.name === 
            "JsonWebTokenError" || 
            error.name ===
            "TokenExpiredError"
        ) {
            return res.status(401).json({
                success: false,
                code: "INVALID_TOKEN",
                message: "Your login session is invalid or has expired."
            })
        }

        return next(error);
    }
}