import crypto from "crypto";

import Giveaway from "../models/Giveaway.js";
import GiveawayParticipation from "../models/GiveawayParticipation.js";
import GiveawayWinner from "../models/GiveawayWinner.js";

import {
  createAuditLog,
} from "../services/auditService.js";

import {
  createRequestId,
} from "../utils/createId.js";

function secureShuffle(items) {
  const result = [
    ...items,
  ];

  for (
    let index =
      result.length - 1;
    index > 0;
    index -= 1
  ) {
    const randomIndex =
      crypto.randomInt(
        0,
        index + 1
      );

    [
      result[index],
      result[randomIndex],
    ] = [
      result[randomIndex],
      result[index],
    ];
  }

  return result;
}

export async function finalizeWinners(
  req,
  res,
  next
) {
  const requestId =
    createRequestId();

  try {
    const giveaway =
      await Giveaway.findOne({
        giveawayId:
          req.params.giveawayId,
      });

    if (!giveaway) {
      return res.status(404).json({
        success: false,
        code:
          "GIVEAWAY_NOT_FOUND",
        message:
          "Giveaway not found.",
      });
    }

    const now = new Date();

    if (
      giveaway.status !==
        "ENDED" &&
      now <= giveaway.endAt
    ) {
      return res.status(409).json({
        success: false,
        code:
          "WINNER_SELECTION_NOT_ALLOWED",
        message:
          "Winners can only be finalized after the giveaway ends.",
      });
    }

    if (
      giveaway.status ===
      "ARCHIVED"
    ) {
      return res.status(409).json({
        success: false,
        code:
          "WINNER_SELECTION_NOT_ALLOWED",
        message:
          "Archived giveaway winners cannot be changed.",
      });
    }

    if (
      now > giveaway.endAt &&
      giveaway.status ===
        "ACTIVE"
    ) {
      giveaway.status =
        "ENDED";

      await giveaway.save();
    }

    const results = [];

    for (
      const prize of
      giveaway.prizes
    ) {
      const existingCount =
        await GiveawayWinner.countDocuments({
          giveawayId:
            giveaway.giveawayId,

          prizeId:
            prize.prizeId,

          status: {
            $ne:
              "DISQUALIFIED",
          },
        });

      const availableSlots =
        Math.max(
          0,
          prize.winnerCount -
            existingCount
        );

      if (
        availableSlots === 0
      ) {
        results.push({
          prizeId:
            prize.prizeId,

          configured:
            prize.winnerCount,

          selected: 0,

          remaining: 0,
        });

        continue;
      }

      const existingWinners =
        await GiveawayWinner.find({
          giveawayId:
            giveaway.giveawayId,

          prizeId:
            prize.prizeId,
        })
          .select("userId")
          .lean();

      const excludedUserIds =
        existingWinners.map(
          (winner) =>
            winner.userId
        );

      const candidates =
        await GiveawayParticipation.find({
          giveawayId:
            giveaway.giveawayId,

          prizeId:
            prize.prizeId,

          status:
            "CONFIRMED",

          userId: {
            $nin:
              excludedUserIds,
          },
        })
          .select(
            "userId"
          )
          .lean();

      const selected =
        secureShuffle(
          candidates
        ).slice(
          0,
          availableSlots
        );

      let createdCount = 0;

      for (
        const participant of
        selected
      ) {
        try {
          const winner =
            await GiveawayWinner.create({
              giveawayId:
                giveaway.giveawayId,

              prizeId:
                prize.prizeId,

              userId:
                participant.userId,

              selectionMethod:
                "SYSTEM",

              status:
                "SELECTED",
            });

          createdCount += 1;

          await createAuditLog({
            userId:
              participant.userId,

            action:
              "WINNER_SELECTED",

            giveawayId:
              giveaway.giveawayId,

            prizeId:
              prize.prizeId,

            result:
              "SUCCESS",

            requestId,

            metadata: {
              winnerId:
                winner._id.toString(),
            },
          });
        } catch (error) {
          if (
            error?.code !==
            11000
          ) {
            throw error;
          }
        }
      }

      results.push({
        prizeId:
          prize.prizeId,

        configured:
          prize.winnerCount,

        selected:
          createdCount,

        remaining:
          Math.max(
            0,
            availableSlots -
              createdCount
          ),
      });
    }

    return res.status(200).json({
      success: true,

      message:
        "Winner finalization completed.",

      data: {
        giveawayId:
          giveaway.giveawayId,

        prizes:
          results,
      },
    });
  } catch (error) {
    return next(error);
  }
}