import mongoose from "mongoose";

import Giveaway from "../models/Giveaway.js";
import User from "../models/User.js";
import GiveawayParticipation from "../models/GiveawayParticipation.js";
import GiveawayEntryTransaction from "../models/GiveawayEntryTransaction.js";

import {
  createTransactionId,
} from "../utils/createId.js";

function createServiceError(
  message,
  code,
  statusCode
) {
  const error = new Error(message);

  error.code = code;
  error.statusCode = statusCode;

  return error;
}

export async function getParticipationStatus({
  userId,
  giveawayId,
}) {
  return GiveawayParticipation.findOne({
    userId,
    giveawayId,
  }).lean();
}

export async function joinGiveaway({
  userId,
  giveawayId,
  prizeId,
  deviceHash = null,
}) {
  const session =
    await mongoose.startSession();

  let finalResult = null;

  try {
    await session.withTransaction(
      async () => {
        const giveaway =
          await Giveaway.findOne({
            giveawayId,
          }).session(session);

        if (!giveaway) {
          throw createServiceError(
            "Giveaway not found.",
            "GIVEAWAY_NOT_FOUND",
            404
          );
        }

        const now = new Date();

        if (
          giveaway.status !==
          "ACTIVE"
        ) {
          throw createServiceError(
            "Giveaway is not active.",
            "GIVEAWAY_NOT_ACTIVE",
            409
          );
        }

        if (now < giveaway.startAt) {
          throw createServiceError(
            "Giveaway has not started.",
            "GIVEAWAY_NOT_ACTIVE",
            409
          );
        }

        if (now > giveaway.endAt) {
          throw createServiceError(
            "Giveaway has ended.",
            "GIVEAWAY_ENDED",
            409
          );
        }

        const prize =
          giveaway.prizes.find(
            (item) =>
              item.prizeId ===
              prizeId
          );

        if (!prize) {
          throw createServiceError(
            "Prize not found.",
            "PRIZE_NOT_FOUND",
            404
          );
        }

        const existing =
          await GiveawayParticipation.findOne({
            userId,
            giveawayId,
          }).session(session);

        if (existing) {
          throw createServiceError(
            "Already participating.",
            "ALREADY_PARTICIPATING",
            409
          );
        }

        const user =
          await User.findOne({
            userId,
          }).session(session);

        if (!user) {
          throw createServiceError(
            "User not found.",
            "USER_NOT_FOUND",
            404
          );
        }

        if (
          user.accountStatus !==
          "ACTIVE"
        ) {
          throw createServiceError(
            "Participation blocked.",
            "PARTICIPATION_BLOCKED",
            403
          );
        }

        // IMPORTANT:
        // Currency and entry fee come from DB.
        // Frontend cannot choose these.
        const currency =
          prize.entryCurrency;

        const entryFee =
          prize.entryFee;

        const balanceBefore =
          user.balances[currency];

        if (
          typeof balanceBefore !==
          "number"
        ) {
          throw createServiceError(
            "Required wallet currency is unavailable.",
            "INVALID_CURRENCY",
            400
          );
        }

        if (
          balanceBefore < entryFee
        ) {
          let code =
            "INSUFFICIENT_TOKEN_BALANCE";

          if (currency === "VEs") {
            code =
              "INSUFFICIENT_VE_BALANCE";
          }

          if (currency === "SVEs") {
            code =
              "INSUFFICIENT_SVE_BALANCE";
          }

          throw createServiceError(
            `Insufficient ${currency}.`,
            code,
            409
          );
        }

        const balanceAfter =
          balanceBefore - entryFee;

        user.balances[currency] =
          balanceAfter;

        await user.save({
          session,
        });

        const transactionId =
          createTransactionId();

        const [transaction] =
          await GiveawayEntryTransaction.create(
            [
              {
                transactionId,
                userId,
                giveawayId,
                prizeId:
                  prize.prizeId,

                currency,
                amount: entryFee,

                type:
                  "ENTRY_FEE",

                status:
                  "SUCCESS",

                balanceBefore,
                balanceAfter,
              },
            ],
            {
              session,
            }
          );

        const [participation] =
          await GiveawayParticipation.create(
            [
              {
                userId,
                giveawayId,

                prizeId:
                  prize.prizeId,

                entryCurrency:
                  currency,

                entryAmount:
                  entryFee,

                deviceHash,

                status:
                  "CONFIRMED",

                transactionId,
              },
            ],
            {
              session,
            }
          );

        giveaway.participantsCount +=
          1;

        await giveaway.save({
          session,
        });

        finalResult = {
          participation,
          transaction,

          balance: {
            currency,
            before:
              balanceBefore,
            after:
              balanceAfter,
          },
        };
      }
    );

    return finalResult;
  } finally {
    await session.endSession();
  }
}