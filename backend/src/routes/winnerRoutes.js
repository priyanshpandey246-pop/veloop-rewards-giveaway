import {
  Router,
} from "express";

import {
  requireAuth,
} from "../middleware/authMiddleware.js";

import {
  giveawayWinners,
  previousWinners,
  myWinnerStatus,
} from "../controllers/winnerController.js";

const router = Router();

router.get(
  "/my-winner-status",
  requireAuth,
  myWinnerStatus
);

router.get(
  "/previous/winners",
  previousWinners
);

router.get(
  "/:giveawayId/winners",
  giveawayWinners
);

export default router;