import Giveaway from "../models/Giveaway.js";
import GiveawayWinner from "../models/GiveawayWinner.js";
import PrizeClaim from "../models/PrizeClaim.js";

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
          $ne: "DISQUALIFIED",
        },
      })
        .sort({
          selectedAt: -1,
        })
        .lean();

    const publicWinners =
      winners.map(
        (winner) => ({
          id: winner._id,

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

export async function myWinnerStatus(
  req,
  res,
  next
) {
  try {
    const winner =
      await GiveawayWinner.findOne({
        userId:
          req.user.userId,

        status: {
          $ne: "DISQUALIFIED",
        },
      })
        .sort({
          selectedAt: -1,
        })
        .lean();

    if (!winner) {
      return res.status(200).json({
        success: true,
        data: null,
      });
    }

    const giveaway =
      await Giveaway.findOne({
        giveawayId:
          winner.giveawayId,
      }).lean();

    if (!giveaway) {
      return res.status(200).json({
        success: true,
        data: null,
      });
    }

    const prize =
      giveaway.prizes.find(
        (item) =>
          item.prizeId ===
          winner.prizeId
      );

    if (!prize) {
      return res.status(200).json({
        success: true,
        data: null,
      });
    }

    const claim =
      await PrizeClaim.findOne({
        winnerId:
          winner._id,
      })
        .select(
          "claimId status submittedAt processedAt"
        )
        .lean();

    const claimPeriodDays =
      giveaway
        .participationSettings
        ?.claimPeriodDays ?? 7;

    const claimDeadline =
      new Date(
        new Date(
          winner.selectedAt
        ).getTime() +
          claimPeriodDays *
            24 *
            60 *
            60 *
            1000
      );

    let claimStatus =
      claim?.status ||
      "NOT_SUBMITTED";

    if (
      !claim &&
      Date.now() >
        claimDeadline.getTime()
    ) {
      claimStatus =
        "EXPIRED";
    }

    return res.status(200).json({
      success: true,

      data: {
        giveawayId:
          giveaway.giveawayId,

        giveawayName:
          giveaway.title,

        prizeId:
          prize.prizeId,

        prizeName:
          prize.name,

        prizeType:
          prize.prizeType,

        claimType:
          prize.claimType,

        winnerStatus:
          winner.status,

        selectedAt:
          winner.selectedAt,

        claimDeadline,

        claimStatus,

        claim: claim
          ? {
              claimId:
                claim.claimId,

              status:
                claim.status,

              submittedAt:
                claim.submittedAt,

              processedAt:
                claim.processedAt,
            }
          : null,
      },
    });
  } catch (error) {
    return next(error);
  }
}