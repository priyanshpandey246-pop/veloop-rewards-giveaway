import {
  getMyClaim,
  submitPrizeClaim,
} from "../services/claimService.js";

import {
  createRequestId,
} from "../utils/createId.js";

import {
  createAuditLog,
} from "../services/auditService.js";

export async function submitClaim(
  req,
  res,
  next
) {
  const requestId =
    createRequestId();

  try {
    const result =
      await submitPrizeClaim({
        userId:
          req.user.userId,

        giveawayId:
          req.params.giveawayId,

        claimData:
          req.body,
      });

    await createAuditLog({
      userId:
        req.user.userId,

      action:
        "CLAIM_SUBMITTED",

      giveawayId:
        req.params.giveawayId,

      prizeId:
        result.prizeId,

      result:
        "SUCCESS",

      requestId,
    });

    return res.status(201).json({
      success: true,

      message:
        "Your prize claim has been submitted.",

      data: result,
    });
  } catch (error) {
    await createAuditLog({
      userId:
        req.user?.userId,

      action:
        "CLAIM_REJECTED",

      giveawayId:
        req.params.giveawayId,

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

export async function myClaim(
  req,
  res,
  next
) {
  try {
    const claim =
      await getMyClaim({
        userId:
          req.user.userId,

        giveawayId:
          req.params.giveawayId,
      });

    return res.status(200).json({
      success: true,

      data: claim,
    });
  } catch (error) {
    return next(error);
  }
}