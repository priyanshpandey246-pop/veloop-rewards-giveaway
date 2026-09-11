import {
  Router,
} from "express";

import {
  giveawayWinners,
  previousWinners,
} from "../controllers/winnerController.js";

const router = Router();

router.get(
  "/previous/winners",
  previousWinners
);

router.get(
  "/:giveawayId/winners",
  giveawayWinners
);

export default router;