import mongoose from "mongoose";

const entryTransactionSchema =
  new mongoose.Schema(
    {
      transactionId: {
        type: String,
        required: true,
        unique: true,
        index: true,
      },

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

      currency: {
        type: String,
        enum: [
          "VEs",
          "SVEs",
          "Tokens",
        ],
        required: true,
      },

      amount: {
        type: Number,
        required: true,
        min: 0,
      },

      type: {
        type: String,
        enum: [
          "ENTRY_FEE",
          "REVERSAL",
        ],
        default: "ENTRY_FEE",
      },

      status: {
        type: String,
        enum: [
          "PENDING",
          "SUCCESS",
          "FAILED",
          "REVERSED",
        ],
        default: "PENDING",
      },

      balanceBefore: {
        type: Number,
        required: true,
      },

      balanceAfter: {
        type: Number,
        required: true,
      },
    },
    {
      timestamps: true,
    }
  );

const GiveawayEntryTransaction =
  mongoose.model(
    "GiveawayEntryTransaction",
    entryTransactionSchema
  );

export default GiveawayEntryTransaction;