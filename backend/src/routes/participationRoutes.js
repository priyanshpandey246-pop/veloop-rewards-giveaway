import { Router } from "express";

import {
  requireAuth,
} from "../middleware/authMiddleware.js";

import {
  joinCurrentGiveaway,
  myGiveawayStatus,
} from "../controllers/participationController.js";

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
  requireAuth,
  joinCurrentGiveaway
);

router.post(
  "/:giveawayId/join",
  participationLimiter,
  requireAuth,
  joinCurrentGiveaway
);

export default router;