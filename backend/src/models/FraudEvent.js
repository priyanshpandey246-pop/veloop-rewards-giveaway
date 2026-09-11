import mongoose from "mongoose";

const fraudEventSchema =
  new mongoose.Schema(
    {
      userId: {
        type: String,
        default: null,
        index: true,
      },

      giveawayId: {
        type: String,
        default: null,
        index: true,
      },

      deviceHash: {
        type: String,
        default: null,
        index: true,
      },

      riskScore: {
        type: Number,
        required: true,
        min: 0,
        max: 100,
      },

      riskLevel: {
        type: String,
        enum: [
          "LOW",
          "MEDIUM",
          "HIGH",
          "CRITICAL",
        ],
        required: true,
      },

      reason: {
        type: String,
        required: true,
      },

      signals: {
        type: [String],
        default: [],
      },

      action: {
        type: String,
        enum: [
          "ALLOWED",
          "FLAGGED",
          "BLOCKED",
          "REVIEW",
        ],
        required: true,
      },

      requestId: {
        type: String,
        default: null,
      },
    },
    {
      timestamps: true,
    }
  );

const FraudEvent =
  mongoose.model(
    "FraudEvent",
    fraudEventSchema
  );

export default FraudEvent;