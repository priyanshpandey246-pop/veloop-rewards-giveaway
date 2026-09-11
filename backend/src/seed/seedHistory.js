import dotenv from "dotenv";
import mongoose from "mongoose";

import connectDatabase from "../config/db.js";

import Giveaway from "../models/Giveaway.js";
import GiveawayWinner from "../models/GiveawayWinner.js";

dotenv.config({
  path: ".env",
});

const historicalGiveaway = {
  giveawayId: "GW-2026-08",

  title: "August Reward Rush",

  slug: "august-reward-rush",

  description:
    "A completed VELOOP Rewards giveaway event used to demonstrate winner history and prize claiming.",

  status: "ENDED",

  startAt:
    new Date(
      "2026-08-01T00:00:00+05:30"
    ),

  endAt:
    new Date(
      "2026-08-10T23:59:59+05:30"
    ),

  participantsCount: 6420,

  rules: [
    "One participation per eligible user.",
    "Winners are finalized after the event ends.",
    "Prize claims are subject to verification.",
  ],

  eligibility: [
    "Authenticated account required.",
    "Account must be eligible under giveaway rules.",
  ],

  participationSettings: {
    oneParticipationPerUser: true,
    claimPeriodDays: 30,
  },

  prizes: [
    {
      prizeId:
        "AUG-PRIZE-WATCH",

      slug:
        "august-apple-watch",

      name:
        "Apple Watch",

      position:
        "2nd Prize",

      description:
        "Apple Watch winner reward.",

      imageKey:
        "apple-watch",

      prizeType:
        "PHYSICAL",

      claimType:
        "SHIPPING",

      winnerCount: 3,

      entryCurrency:
        "VEs",

      entryFee: 200,
    },

    {
      prizeId:
        "AUG-AMZ-2000",

      slug:
        "august-amazon-2000",

      name:
        "₹2,000 Amazon Voucher",

      position:
        "Reward Draw",

      description:
        "Amazon digital gift-card reward.",

      imageKey:
        "amazon-2000",

      prizeType:
        "GIFT_CARD",

      claimType:
        "EMAIL",

      winnerCount: 10,

      entryCurrency:
        "VEs",

      entryFee: 500,
    },
  ],
};

async function seedHistory() {
  try {
    await connectDatabase();

    const giveaway =
      await Giveaway.findOneAndUpdate(
        {
          giveawayId:
            historicalGiveaway
              .giveawayId,
        },
        {
          $set:
            historicalGiveaway,
        },
        {
          upsert: true,
          returnDocument:
            "after",
          runValidators: true,
        }
      );

    await GiveawayWinner.findOneAndUpdate(
      {
        giveawayId:
          giveaway.giveawayId,

        prizeId:
          "AUG-PRIZE-WATCH",

        userId:
          "VE10025",
      },
      {
        $set: {
          giveawayId:
            giveaway.giveawayId,

          prizeId:
            "AUG-PRIZE-WATCH",

          userId:
            "VE10025",

          selectionMethod:
            "SYSTEM",

          selectedAt:
            new Date(
              "2026-08-11T12:00:00+05:30"
            ),

          status:
            "VERIFIED",
        },
      },
      {
        upsert: true,
        returnDocument:
          "after",
        runValidators: true,
      }
    );

    await GiveawayWinner.findOneAndUpdate(
      {
        giveawayId:
          giveaway.giveawayId,

        prizeId:
          "AUG-AMZ-2000",

        userId:
          "VE20030",
      },
      {
        $set: {
          giveawayId:
            giveaway.giveawayId,

          prizeId:
            "AUG-AMZ-2000",

          userId:
            "VE20030",

          selectionMethod:
            "SYSTEM",

          selectedAt:
            new Date(
              "2026-08-11T12:05:00+05:30"
            ),

          status:
            "VERIFIED",
        },
      },
      {
        upsert: true,
        returnDocument:
          "after",
        runValidators: true,
      }
    );

    console.log(
      "Historical giveaway and winners seeded."
    );
  } catch (error) {
    console.error(
      "History seed failed:",
      error.message
    );

    process.exitCode = 1;
  } finally {
    await mongoose.disconnect();

    console.log(
      "MongoDB disconnected."
    );
  }
}

seedHistory();