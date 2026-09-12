import Giveaway from "../models/Giveaway.js";

async function syncGiveawayLifecycle() {
  const now = new Date();

  await Giveaway.updateMany(
    {
      status: "UPCOMING",
      startAt: {
        $lte: now,
      },
      endAt: {
        $gte: now,
      },
    },
    {
      $set: {
        status: "ACTIVE",
      },
    }
  );

  await Giveaway.updateMany(
    {
      status: {
        $in: [
          "UPCOMING",
          "ACTIVE",
        ],
      },
      endAt: {
        $lt: now,
      },
    },
    {
      $set: {
        status: "ENDED",
      },
    }
  );
}

async function getCurrentGiveaway() {
  await syncGiveawayLifecycle();

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
  await syncGiveawayLifecycle();

  const normalizedIdentifier =
    identifier.toLowerCase();

  return Giveaway.findOne({
    $or: [
      {
        giveawayId:
          identifier,
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
  await syncGiveawayLifecycle();

  return Giveaway.find({
    status: {
      $in: [
        "ENDED",
        "ARCHIVED",
      ],
    },
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