import mongoose from "mongoose";

const auditLogSchema =
  new mongoose.Schema(
    {
      userId: {
        type: String,
        default: null,
        index: true,
      },

      action: {
        type: String,
        required: true,
        index: true,
      },

      giveawayId: {
        type: String,
        default: null,
        index: true,
      },

      prizeId: {
        type: String,
        default: null,
      },

      currency: {
        type: String,
        default: null,
      },

      amount: {
        type: Number,
        default: null,
      },

      result: {
        type: String,
        enum: [
          "SUCCESS",
          "FAILED",
          "BLOCKED",
          "FLAGGED",
        ],
        required: true,
      },

      requestId: {
        type: String,
        default: null,
        index: true,
      },

      metadata: {
        type: mongoose.Schema.Types.Mixed,
        default: {},
      },
    },
    {
      timestamps: true,
    }
  );

const AuditLog =
  mongoose.model(
    "AuditLog",
    auditLogSchema
  );

export default AuditLog;