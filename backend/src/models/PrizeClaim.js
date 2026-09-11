import mongoose from "mongoose";

const shippingDetailsSchema =
  new mongoose.Schema(
    {
      fullName: {
        type: String,
        trim: true,
      },

      phone: {
        type: String,
        trim: true,
      },

      address: {
        type: String,
        trim: true,
      },

      city: {
        type: String,
        trim: true,
      },

      state: {
        type: String,
        trim: true,
      },

      pinCode: {
        type: String,
        trim: true,
      },
    },
    {
      _id: false,
    }
  );

const prizeClaimSchema =
  new mongoose.Schema(
    {
      claimId: {
        type: String,
        required: true,
        unique: true,
        index: true,
      },

      winnerId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "GiveawayWinner",
        required: true,
        unique: true,
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

      userId: {
        type: String,
        required: true,
        index: true,
      },

      claimType: {
        type: String,
        enum: [
          "SHIPPING",
          "EMAIL",
          "DIGITAL",
        ],
        required: true,
      },

      shippingDetails: {
        type: shippingDetailsSchema,
        default: undefined,
      },

      deliveryEmail: {
        type: String,
        trim: true,
        lowercase: true,
      },

      status: {
        type: String,
        enum: [
          "SUBMITTED",
          "PROCESSING",
          "COMPLETED",
          "EXPIRED",
          "REJECTED",
        ],
        default: "SUBMITTED",
      },

      submittedAt: {
        type: Date,
        default: Date.now,
      },

      processedAt: {
        type: Date,
        default: null,
      },
    },
    {
      timestamps: true,
    }
  );

const PrizeClaim =
  mongoose.model(
    "PrizeClaim",
    prizeClaimSchema
  );

export default PrizeClaim;