import {
  Router,
} from "express";

import {
  createDemoSession,
} from "../controllers/authController.js";

import {
  authLimiter,
} from "../middleware/rateLimitMiddleware.js";

const router = Router();

router.post(
  "/demo-session",
  createDemoSession
);

router.post(
  "/demo-session",
  authLimiter,
  createDemoSession
);

export default router;