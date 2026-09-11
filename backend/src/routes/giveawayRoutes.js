import {
    Router,
} from "express";

import {
    currentGiveaway,
    giveawayDetails,
    previousGiveaways,
} from "../controllers/giveawayController.js";

const router = Router();
router.get(
    "/current",
    currentGiveaway
);

router.get(
    "/previous",
    previousGiveaways
);

router.get(
    "/:identifier",
    giveawayDetails
);

export default router;