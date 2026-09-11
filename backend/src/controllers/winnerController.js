import Giveaway from "../models/Giveaway.js";

import GiveawayWinner from "../models/GiveawayWinner.js";

function maskUserId(userId) {
  if (!userId) {
    return "VE****";
  }

  if (userId.length <= 4) {
    return "****";
  }

  return `${userId.slice(
    0,
    2
  )}****${userId.slice(-2)}`;
}

export async function giveawayWinners(
  req,
  res,
  next
) {
  try {
    const giveaway =
      await Giveaway.findOne({
        giveawayId:
          req.params.giveawayId,
      }).lean();

    if (!giveaway) {
      return res.status(404).json({
        success: false,
        code:
          "GIVEAWAY_NOT_FOUND",
        message:
          "Giveaway not found.",
      });
    }

    if (
      giveaway.status ===
      "ACTIVE"
    ) {
      return res.status(200).json({
        success: true,

        data: [],

        message:
          "Winners will be announced after the giveaway ends.",
      });
    }

    const winners =
      await GiveawayWinner.find({
        giveawayId:
          giveaway.giveawayId,

        status: {
          $ne:
            "DISQUALIFIED",
        },
      })
        .sort({
          selectedAt: -1,
        })
        .lean();

    const publicWinners =
      winners.map(
        (winner) => ({
          id:
            winner._id,

          user:
            maskUserId(
              winner.userId
            ),

          prizeId:
            winner.prizeId,

          selectedAt:
            winner.selectedAt,

          status:
            winner.status,
        })
      );

    return res.status(200).json({
      success: true,
      data: publicWinners,
    });
  } catch (error) {
    return next(error);
  }
}

export async function previousWinners(
  req,
  res,
  next
) {
  try {
    const winners =
      await GiveawayWinner.find({
        status: {
          $ne: "DISQUALIFIED",
        },
      })
        .sort({
          selectedAt: -1,
        })
        .lean();

    const giveawayIds = [
      ...new Set(
        winners.map(
          (winner) =>
            winner.giveawayId
        )
      ),
    ];

    const giveaways =
      await Giveaway.find({
        giveawayId: {
          $in: giveawayIds,
        },

        status: {
          $in: [
            "ENDED",
            "ARCHIVED",
          ],
        },
      }).lean();

    const giveawayMap =
      new Map(
        giveaways.map(
          (giveaway) => [
            giveaway.giveawayId,
            giveaway,
          ]
        )
      );

    const data =
      winners
        .map((winner) => {
          const giveaway =
            giveawayMap.get(
              winner.giveawayId
            );

          if (!giveaway) {
            return null;
          }

          const prize =
            giveaway.prizes.find(
              (item) =>
                item.prizeId ===
                winner.prizeId
            );

          if (!prize) {
            return null;
          }

          return {
            id: winner._id,

            user:
              maskUserId(
                winner.userId
              ),

            prize:
              prize.name,

            prizeId:
              prize.prizeId,

            category:
              prize.position,

            giveaway:
              giveaway.title,

            giveawayId:
              giveaway.giveawayId,

            date:
              winner.selectedAt,

            status:
              winner.status,
          };
        })
        .filter(Boolean);

    return res.status(200).json({
      success: true,
      data,
    });
  } catch (error) {
    return next(error);
  }
}