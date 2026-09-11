import {
  Router,
} from "express";

import {
  requireAuth,
} from "../middleware/authMiddleware.js";

import {
  claimLimiter,
} from "../middleware/rateLimitMiddleware.js";

import {
  myClaim,
  submitClaim,
} from "../controllers/claimController.js";

const router = Router();

router.get(
  "/:giveawayId/my-claim",
  requireAuth,
  myClaim
);

router.post(
  "/:giveawayId/claim",
  claimLimiter,
  requireAuth,
  submitClaim
);

export default router;