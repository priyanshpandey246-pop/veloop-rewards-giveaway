import {
  Router,
} from "express";

import {
  requireAuth,
} from "../middleware/authMiddleware.js";

import {
  joinCurrentGiveaway,
  myGiveawayStatus,
} from "../controllers/participationController.js";

import {
  requireIdempotencyKey,
} from "../middleware/idempotencyMiddleware.js";

import {
  participationLimiter,
} from "../middleware/rateLimitMiddleware.js";

const router = Router();

router.get(
  "/:giveawayId/my-status",
  requireAuth,
  myGiveawayStatus
);

router.post(
  "/:giveawayId/join",
  participationLimiter,
  requireAuth,
  requireIdempotencyKey,
  joinCurrentGiveaway
);

export default router;