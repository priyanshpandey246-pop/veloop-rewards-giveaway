import crypto from "crypto";

import Giveaway from "../models/Giveaway.js";
import GiveawayWinner from "../models/GiveawayWinner.js";
import PrizeClaim from "../models/PrizeClaim.js";

function serviceError(
  message,
  code,
  statusCode
) {
  const error = new Error(message);
  error.code = code;
  error.statusCode = statusCode;

  return error;
}

function validatePhysicalClaim(data) {
  const {
    fullName,
    phone,
    address,
    city,
    state,
    pinCode,
  } = data;

  if (
    !fullName?.trim() ||
    !phone?.trim() ||
    !address?.trim() ||
    !city?.trim() ||
    !state?.trim() ||
    !pinCode?.trim()
  ) {
    throw serviceError(
      "Required claim information is missing.",
      "INVALID_CLAIM_DETAILS",
      400
    );
  }

  const phoneDigits =
    phone.replace(/\D/g, "");

  if (phoneDigits.length < 10) {
    throw serviceError(
      "Invalid phone number.",
      "INVALID_PHONE",
      400
    );
  }

  if (!/^\d{6}$/.test(pinCode)) {
    throw serviceError(
      "Invalid PIN code.",
      "INVALID_PIN_CODE",
      400
    );
  }

  return {
    fullName: fullName.trim(),
    phone: phone.trim(),
    address: address.trim(),
    city: city.trim(),
    state: state.trim(),
    pinCode: pinCode.trim(),
  };
}

function validateEmail(email) {
  const normalized =
    String(email || "")
      .trim()
      .toLowerCase();

  const valid =
    /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(
      normalized
    );

  if (!valid) {
    throw serviceError(
      "Invalid email address.",
      "INVALID_EMAIL",
      400
    );
  }

  return normalized;
}

export async function submitPrizeClaim({
  userId,
  giveawayId,
  claimData,
}) {
  const winner =
    await GiveawayWinner.findOne({
      userId,
      giveawayId,

      status: {
        $in: [
          "SELECTED",
          "VERIFIED",
        ],
      },
    });

  if (!winner) {
    throw serviceError(
      "Claim not allowed.",
      "CLAIM_NOT_ALLOWED",
      403
    );
  }

  const existingClaim =
    await PrizeClaim.findOne({
      winnerId: winner._id,
    }).lean();

  if (existingClaim) {
    throw serviceError(
      "Prize claim already submitted.",
      "CLAIM_ALREADY_SUBMITTED",
      409
    );
  }

  const giveaway =
    await Giveaway.findOne({
      giveawayId,
    });

  if (!giveaway) {
    throw serviceError(
      "Giveaway not found.",
      "GIVEAWAY_NOT_FOUND",
      404
    );
  }

    if (
    ![
      "ENDED",
      "ARCHIVED",
    ].includes(giveaway.status)
  ) {
    throw serviceError(
      "Claims are not currently available.",
      "CLAIM_NOT_ALLOWED",
      409
    );
  }

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

  if (
    Date.now() >
    claimDeadline.getTime()
  ) {
    throw serviceError(
      "The prize claim window has expired.",
      "CLAIM_WINDOW_EXPIRED",
      409
    );
  }

  const prize =
    giveaway.prizes.find(
      (item) =>
        item.prizeId ===
        winner.prizeId
    );

  if (!prize) {
    throw serviceError(
      "Winner prize could not be found.",
      "PRIZE_NOT_FOUND",
      404
    );
  }

  const claimId =
    `CLM-${crypto.randomUUID()}`;

  const claimPayload = {
    claimId,

    winnerId:
      winner._id,

    giveawayId,

    prizeId:
      winner.prizeId,

    userId,

    claimType:
      prize.claimType,

    status:
      "SUBMITTED",
  };

  if (
    prize.claimType ===
    "SHIPPING"
  ) {
    claimPayload.shippingDetails =
      validatePhysicalClaim(
        claimData
      );
  } else if (
    prize.claimType === "EMAIL"
  ) {
    claimPayload.deliveryEmail =
      validateEmail(
        claimData.email
      );
  } else {
    throw serviceError(
      "Unsupported claim type.",
      "INVALID_CLAIM_TYPE",
      400
    );
  }

  const claim =
    await PrizeClaim.create(
      claimPayload
    );

  winner.status = "CLAIMED";

  await winner.save();

  return {
    claimId:
      claim.claimId,

    prizeId:
      claim.prizeId,

    claimType:
      claim.claimType,

    status:
      claim.status,

    submittedAt:
      claim.submittedAt,
  };
}

export async function getMyClaim({
  userId,
  giveawayId,
}) {
  const claim =
    await PrizeClaim.findOne({
      userId,
      giveawayId,
    })
      .select(
        "claimId giveawayId prizeId claimType status submittedAt processedAt"
      )
      .lean();

  return claim;
}