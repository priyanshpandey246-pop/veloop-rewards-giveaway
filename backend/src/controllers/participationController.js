import Giveaway from "../models/Giveaway.js";

import {
  getParticipationStatus,
  joinGiveaway,
} from "../services/participationService.js";

import {
  createRequestId,
} from "../utils/createId.js";

import {
  createDeviceHash,
} from "../utils/deviceHash.js";

import {
  createAuditLog,
} from "../services/auditService.js";

import {
  recordFraudEvent,
} from "../services/fraudService.js";

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

    if (
      !prizeId ||
      typeof prizeId !== "string"
    ) {
      return res.status(400).json({
        success: false,
        code:
          "PRIZE_REQUIRED",
        message:
          "Please select a valid giveaway prize.",
      });
    }

    const deviceHash =
      createDeviceHash(req);

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

      metadata: {
        transactionId:
          result.transaction
            .transactionId,
      },
    });

    const responseBody = {
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
    };

    if (
      req.idempotencyRecord
    ) {
      req.idempotencyRecord.status =
        "COMPLETED";

      req.idempotencyRecord.responseStatus =
        201;

      req.idempotencyRecord.responseBody =
        responseBody;

      await req.idempotencyRecord.save();
    }

    return res
      .status(201)
      .json(responseBody);
  } catch (error) {

    await createAuditLog({
      userId:
        req.user?.userId ||
        null,

      action:
        "JOIN_REJECTED",

      giveawayId:
        req.params.giveawayId,

      prizeId:
        req.body?.prizeId ||
        null,

      result:
        "FAILED",

      requestId,

      metadata: {
        code:
          error.code ||
          "UNKNOWN_ERROR",
      },
    });

    if (
      error.code ===
      "ALREADY_PARTICIPATING"
    ) {
      try {
        await recordFraudEvent({
          userId:
            req.user?.userId ||
            null,

          giveawayId:
            req.params
              .giveawayId,

          deviceHash:
            createDeviceHash(req),

          riskScore: 25,

          reason:
            "Repeated participation attempt",

          signals: [
            "DUPLICATE_PARTICIPATION",
          ],

          action:
            "FLAGGED",

          requestId,
        });
      } catch (fraudError) {
        console.error(
          "Fraud event logging failed:",
          fraudError.message
        );
      }
    }

    if (
      req.idempotencyRecord
    ) {
      try {
        req.idempotencyRecord.status =
          "FAILED";

        await req.idempotencyRecord.save();
      } catch (
        idempotencyError
      ) {
        console.error(
          "Idempotency update failed:",
          idempotencyError.message
        );
      }
    }

    return next(error);
  }
}