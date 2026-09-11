import Giveaway from "../models/Giveaway.js";

async function getCurrentGiveaway() {
  const now = new Date();

  return Giveaway.findOne({
    status: "ACTIVE",
    startAt: {
      $lte: now,
    },
    endAt: {
      $gte: now,
    },
  }).lean();
}

async function getGiveawayByIdentifier(
  identifier
) {
  const normalizedIdentifier =
    identifier.toLowerCase();

  return Giveaway.findOne({
    $or: [
      {
        giveawayId: identifier,
      },
      {
        slug:
          normalizedIdentifier,
      },
      {
        "prizes.slug":
          normalizedIdentifier,
      },
    ],
  }).lean();
}

async function getPreviousGiveaways() {
  const now = new Date();

  return Giveaway.find({
    $or: [
      {
        status: {
          $in: [
            "ENDED",
            "ARCHIVED",
          ],
        },
      },
      {
        endAt: {
          $lt: now,
        },
      },
    ],
  })
    .sort({
      endAt: -1,
    })
    .lean();
}

export {
  getCurrentGiveaway,
  getGiveawayByIdentifier,
  getPreviousGiveaways,
};