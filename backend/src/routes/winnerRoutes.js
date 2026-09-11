import {
  Router,
} from "express";

import {
  giveawayWinners,
} from "../controllers/winnerController.js";

const router = Router();

router.get(
  "/:giveawayId/winners",
  giveawayWinners
);

export default router;