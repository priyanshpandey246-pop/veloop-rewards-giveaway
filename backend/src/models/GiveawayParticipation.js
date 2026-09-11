import mongoose from "mongoose";

const participationSchema =
  new mongoose.Schema(
    {
      userId: {
        type: String,
        required: true,
        index: true,
      },

      giveawayId: {
        type: String,
        required: true,
        index: true,
      },

      prizeId: {
        type: String,
        required: true,
      },

      entryCurrency: {
        type: String,
        enum: [
          "VEs",
          "SVEs",
          "Tokens",
        ],
        required: true,
      },

      entryAmount: {
        type: Number,
        required: true,
        min: 0,
      },

      deviceHash: {
        type: String,
        default: null,
      },

      status: {
        type: String,
        enum: [
          "CONFIRMED",
          "FLAGGED",
          "BLOCKED",
        ],
        default: "CONFIRMED",
      },

      transactionId: {
        type: String,
        required: true,
      },

      joinedAt: {
        type: Date,
        default: Date.now,
      },
    },
    {
      timestamps: true,
    }
  );

participationSchema.index(
  {
    userId: 1,
    giveawayId: 1,
  },
  {
    unique: true,
  }
);

const GiveawayParticipation =
  mongoose.model(
    "GiveawayParticipation",
    participationSchema
  );

export default GiveawayParticipation;