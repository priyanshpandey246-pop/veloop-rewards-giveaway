import mongoose from "mongoose";

const idempotencyKeySchema =
  new mongoose.Schema(
    {
      key: {
        type: String,
        required: true,
      },

      userId: {
        type: String,
        required: true,
      },

      operation: {
        type: String,
        required: true,
      },

      status: {
        type: String,
        enum: [
          "PROCESSING",
          "COMPLETED",
          "FAILED",
        ],
        default: "PROCESSING",
      },

      responseStatus: {
        type: Number,
        default: null,
      },

      responseBody: {
        type: mongoose.Schema.Types.Mixed,
        default: null,
      },

      expiresAt: {
        type: Date,
        required: true,
      },
    },
    {
      timestamps: true,
    }
  );

idempotencyKeySchema.index(
  {
    key: 1,
    userId: 1,
    operation: 1,
  },
  {
    unique: true,
  }
);

idempotencyKeySchema.index(
  {
    expiresAt: 1,
  },
  {
    expireAfterSeconds: 0,
  }
);

const IdempotencyKey =
  mongoose.model(
    "IdempotencyKey",
    idempotencyKeySchema
  );

export default IdempotencyKey;