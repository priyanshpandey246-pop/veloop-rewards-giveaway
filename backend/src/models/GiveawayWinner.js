import mongoose from "mongoose";

const giveawayWinnerSchema =
  new mongoose.Schema(
    {
      giveawayId: {
        type: String,
        required: true,
        index: true,
      },

      prizeId: {
        type: String,
        required: true,
        index: true,
      },

      userId: {
        type: String,
        required: true,
        index: true,
      },

      selectionMethod: {
        type: String,
        enum: [
          "RANDOM",
          "MANUAL_REVIEW",
          "SYSTEM",
        ],
        default: "SYSTEM",
      },

      selectedAt: {
        type: Date,
        default: Date.now,
      },

      status: {
        type: String,
        enum: [
          "SELECTED",
          "VERIFIED",
          "CLAIMED",
          "DISQUALIFIED",
        ],
        default: "SELECTED",
      },
    },
    {
      timestamps: true,
    }
  );

giveawayWinnerSchema.index(
  {
    giveawayId: 1,
    prizeId: 1,
    userId: 1,
  },
  {
    unique: true,
  }
);

const GiveawayWinner =
  mongoose.model(
    "GiveawayWinner",
    giveawayWinnerSchema
  );

export default GiveawayWinner;