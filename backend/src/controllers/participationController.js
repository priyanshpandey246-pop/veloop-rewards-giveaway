import Giveaway from "../models/Giveaway.js";
import {
  createDeviceHash,
} from "../utils/deviceHash.js";
import {
  getParticipationStatus,
  joinGiveaway,
} from "../services/participationService.js";

import {
  createRequestId,
} from "../utils/createId.js";

import {
  createAuditLog,
} from "../services/auditService.js";

export async function myGiveawayStatus(
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
          "The requested giveaway could not be found.",
      });
    }

    const participation =
      await getParticipationStatus({
        userId:
          req.user.userId,

        giveawayId:
          giveaway.giveawayId,
      });

    return res.status(200).json({
      success: true,

      data: {
        participating:
          Boolean(participation),

        participation,

        balances:
          req.user.balances,
      },
    });
  } catch (error) {
    return next(error);
  }
}

export async function joinCurrentGiveaway(
  req,
  res,
  next
) {
  const requestId =
    req.headers[
      "x-idempotency-key"
    ] ||
    createRequestId();

  try {
    const {
  prizeId,
} = req.body;

const deviceHash =
  createDeviceHash(req);

    if (
      !prizeId ||
      typeof prizeId !== "string"
    ) {
      return res.status(400).json({
        success: false,
        code: "PRIZE_REQUIRED",
        message:
          "Please select a valid giveaway prize.",
      });
    }

    const result =
      await joinGiveaway({
        userId:
          req.user.userId,

        giveawayId:
          req.params.giveawayId,

        prizeId,
        deviceHash,
      });

    await createAuditLog({
      userId:
        req.user.userId,

      action:
        "JOIN_GIVEAWAY",

      giveawayId:
        req.params.giveawayId,

      prizeId,

      currency:
        result.balance.currency,

      amount:
        result.transaction.amount,

      result:
        "SUCCESS",

      requestId,
    });

    return res.status(201).json({
      success: true,

      message:
        "Your giveaway participation has been recorded.",

      data: {
        participationId:
          result.participation._id,

        transactionId:
          result.transaction
            .transactionId,

        currency:
          result.balance.currency,

        amount:
          result.transaction.amount,

        balanceBefore:
          result.balance.before,

        balanceAfter:
          result.balance.after,
      },
    });
  } catch (error) {
    await createAuditLog({
      userId:
        req.user?.userId,

      action:
        "JOIN_REJECTED",

      giveawayId:
        req.params.giveawayId,

      prizeId:
        req.body?.prizeId,

      result:
        "FAILED",

      requestId,

      metadata: {
        code:
          error.code ||
          "UNKNOWN_ERROR",
      },
    });

    return next(error);
  }
}