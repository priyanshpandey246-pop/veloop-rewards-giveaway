import dotenv from "dotenv";
import mongoose from "mongoose";

import connectDatabase from "../config/db.js";
import Giveaway from "../models/Giveaway.js";
import User from "../models/User.js";

dotenv.config({
    path: ".env",
});

const giveaway = {
    giveawayId: "GW-2026-09",
    title: "VELOOP September Rewards",
    slug: "september-rewards",
    description: "Participate in VELOOP Rewards giveaways for a chance to win premium rewards.",
    status: "ACTIVE",
    startAt: 
    new Date(
        "2026-08-20T00:00:00+05:30"
    ),
    endAt: 
    new Date(
        "2026-09-12T17:30:00+05:30"
    ),
    participantsCount: 8500,

    rules: [
        "Users must meet the configured eligibility requirements.",
        "One participation per user is allowed for this giveaway event.",
        "Entry requirements must be reviewed before participation.",
        "Winners are finalized only after the giveaway ends.",
        "Prize claims must be submitted within the applicable claim period.",
    ],

     eligibility: [
    "User must be authenticated.",
    "Account must be active.",
    "User must have sufficient balance in the required currency.",
  ],

      participationSettings: {
    oneParticipationPerUser: true,
    claimPeriodDays: 7,
  },

      prizes: [
    {
      prizeId: "PRIZE-IP15",
      slug: "iphone-15-pro",
      name: "iPhone 15 Pro",
      position: "1st Prize",

      description:
        "A premium iPhone 15 Pro reward.",

      imageKey: "iphone",

      prizeType: "PHYSICAL",
      claimType: "SHIPPING",

      winnerCount: 1,

      entryCurrency: "VEs",
      entryFee: 250,
    },

     {
      prizeId: "PRIZE-WATCH",
      slug: "apple-watch",
      name: "Apple Watch",
      position: "2nd Prize",

      description:
        "A premium Apple Watch reward.",

      imageKey: "apple-watch",

      prizeType: "PHYSICAL",
      claimType: "SHIPPING",

      winnerCount: 3,

      entryCurrency: "VEs",
      entryFee: 200,
    },

    {
      prizeId: "PRIZE-AIRPODS",
      slug: "airpods",
      name: "AirPods Pro",
      position: "3rd Prize",

      description:
        "Premium wireless AirPods reward.",

      imageKey: "airpods",

      prizeType: "PHYSICAL",
      claimType: "SHIPPING",

      winnerCount: 5,

      entryCurrency: "SVEs",
      entryFee: 500,
    },

     {
      prizeId: "PRIZE-AMZ-2000",
      slug: "amazon-2000",
      name: "₹2,000 Amazon Voucher",
      position: "Reward Draw",

      description:
        "₹2,000 Amazon digital voucher.",

      imageKey: "amazon-2000",

      prizeType: "GIFT_CARD",
      claimType: "EMAIL",

      winnerCount: 10,

      entryCurrency: "VEs",
      entryFee: 500,
    },
    

    {
      prizeId: "PRIZE-AMZ-500",
      slug: "amazon-500",
      name: "₹500 Amazon Voucher",
      position: "Reward Draw",

      description:
        "₹500 Amazon digital voucher.",

      imageKey: "amazon-500",

      prizeType: "GIFT_CARD",
      claimType: "EMAIL",

      winnerCount: 15,

      entryCurrency: "VEs",
      entryFee: 300,
    },

     {
      prizeId: "PRIZE-AMZ-20",
      slug: "amazon-20",
      name: "₹20 Amazon Voucher",
      position: "Token Reward",

      description:
        "₹20 Amazon digital voucher.",

      imageKey: "amazon-20",

      prizeType: "DIGITAL",
      claimType: "EMAIL",

      winnerCount: 25,

      entryCurrency: "Tokens",
      entryFee: 2000,
    },
  ],
}

const developmentUser = {
    userId: "VE10025",
    displayName: "VE*****25",
    email: "demo.user@veloop.local",
    role: "USER",
    balances: {
        VEs: 850,
        SVEs: 1200,
        Tokens: 3500,
    },
    accountStatus: "ACTIVE",
};

async function seed() {
  try {
    await connectDatabase();

    console.log(
      "Mongoose ready state:",
      mongoose.connection.readyState
    );

    if (
      mongoose.connection.readyState !==
      1
    ) {
      throw new Error(
        "MongoDB is not connected."
      );
    }

    const savedGiveaway =
      await Giveaway.findOneAndUpdate(
        {
          giveawayId:
            giveaway.giveawayId,
        },
        {
          $set: giveaway,
        },
        {
          upsert: true,
          returnDocument: "after",
          runValidators: true,
        }
      );

    console.log(
      "Giveaway seeded:",
      savedGiveaway.giveawayId
    );

    const savedUser =
      await User.findOneAndUpdate(
        {
          userId:
            developmentUser.userId,
        },
        {
          $set: developmentUser,
        },
        {
          upsert: true,
          returnDocument: "after",
          runValidators: true,
        }
      );

    console.log(
      "Development user seeded:",
      savedUser.userId
    );

    console.log(
      "VELOOP development seed completed."
    );
  } catch (error) {
    console.error(
      "Seed failed:",
      error.message
    );

    process.exitCode = 1;
  } finally {
    if (
      mongoose.connection.readyState !==
      0
    ) {
      await mongoose.disconnect();
    }

    console.log(
      "MongoDB disconnected."
    );
  }
}

seed();