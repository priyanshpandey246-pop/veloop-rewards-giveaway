import {
  getCurrentGiveaway,
  getGiveawayByIdentifier,
  getPreviousGiveaways,
} from "../services/giveawayService.js";

async function currentGiveaway(
  req,
  res,
  next
) {
  try {
    const giveaway =
      await getCurrentGiveaway();

    if (!giveaway) {
      return res.status(200).json({
        success: true,
        data: null,
        message:
          "No active giveaway is currently available.",
      });
    }

    return res.status(200).json({
      success: true,
      data: giveaway,
    });
  } catch (error) {
    return next(error);
  }
}

async function giveawayDetails(
  req,
  res,
  next
) {
  try {
    const giveaway =
      await getGiveawayByIdentifier(
        req.params.identifier
      );

    if (!giveaway) {
      return res.status(404).json({
        success: false,
        code: "GIVEAWAY_NOT_FOUND",
        message:
          "The requested giveaway could not be found.",
      });
    }

    return res.status(200).json({
      success: true,
      data: giveaway,
    });
  } catch (error) {
    return next(error);
  }
}

async function previousGiveaways(
  req,
  res,
  next
) {
  try {
    const giveaways =
      await getPreviousGiveaways();

    return res.status(200).json({
      success: true,
      data: giveaways,
    });
  } catch (error) {
    return next(error);
  }
}

export {
  currentGiveaway,
  giveawayDetails,
  previousGiveaways,
};