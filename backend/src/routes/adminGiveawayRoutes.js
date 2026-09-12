import {
  Router,
} from "express";

import {
  requireAuth,
} from "../middleware/authMiddleware.js";

import {
  requireAdmin,
} from "../middleware/adminMiddleware.js";

import {
  finalizeWinners,
} from "../controllers/adminGiveawayController.js";

const router = Router();

router.post(
  "/giveaways/:giveawayId/finalize-winners",
  requireAuth,
  requireAdmin,
  finalizeWinners
);

export default router;