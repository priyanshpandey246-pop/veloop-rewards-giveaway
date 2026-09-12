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

  const exactEvent =
    await Giveaway.findOne({
      $or: [
        {
          giveawayId:
            identifier,
        },
        {
          slug:
            normalizedIdentifier,
        },
      ],
    }).lean();

  if (exactEvent) {
    return exactEvent;
  }

  const prizeGiveaway =
    await Giveaway.findOne({
      "prizes.slug":
        normalizedIdentifier,

      status: {
        $in: [
          "ACTIVE",
          "UPCOMING",
        ],
      },
    })
      .sort({
        startAt: -1,
      })
      .lean();

  if (prizeGiveaway) {
    return prizeGiveaway;
  }

  return Giveaway.findOne({
    "prizes.slug":
      normalizedIdentifier,
  })
    .sort({
      startAt: -1,
    })
    .lean();
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