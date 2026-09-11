import mongoose from  "mongoose";
const prizeSchema = new mongoose.Schema(
    {
        prizeId: {
            type: String,
            required: true,
            trim: true,
        },

        name: {
            type: String,
            required: true,
            trim: true,
        },

        slug: {
            type: String,
            required: true,
            trim: true,
        },

        position: {
            type: String,
            required: true,
        },

        description: {
            type: String,
            default: "",
        },

        imageKey: {
            type: String,
            default: "",
        },

          prizeType: {
      type: String,
      enum: [
        "PHYSICAL",
        "GIFT_CARD",
        "DIGITAL",
      ],
      required: true,
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

    winnerCount: {
        type: Number,
        required: true,
        min: 1,
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

    entryFee: {
        type: Number,
        required: true,
        min: 0,
    },

    },
    {
    _id: false,
}
);

const giveawaySchema =
  new mongoose.Schema(
    {
      giveawayId: {
        type: String,
        required: true,
        unique: true,
        index: true,
        trim: true,
      },

      title: {
        type: String,
        required: true,
        trim: true,
      },

      slug: {
        type: String,
        required: true,
        unique: true,
        index: true,
        lowercase: true,
        trim: true,
      },

      description: {
        type: String,
        required: true,
      },

      status: {
        type: String,
        enum: [
          "UPCOMING",
          "ACTIVE",
          "ENDED",
          "ARCHIVED",
        ],
        default: "UPCOMING",
        index: true,
      },

      startAt: {
        type: Date,
        required: true,
      },

      endAt: {
        type: Date,
        required: true,
      },

      prizes: {
        type: [prizeSchema],
        default: [],
      },

      participantsCount: {
        type: Number,
        default: 0,
        min: 0,
      },

      rules: {
        type: [String],
        default: [],
      },

      eligibility: {
        type: [String],
        default: [],
      },

      participationSettings: {
        oneParticipationPerUser: {
          type: Boolean,
          default: true,
        },

        claimPeriodDays: {
          type: Number,
          default: 7,
          min: 1,
        },
      },
    },
    {
      timestamps: true,
    }
  );

giveawaySchema.pre(
  "validate",
  function validateDates() {
    if (
      this.startAt &&
      this.endAt &&
      this.endAt <= this.startAt
    ) {
      this.invalidate(
        "endAt",
        "Giveaway end time must be after start time."
      );
    }
  }
);

const Giveaway =
  mongoose.model(
    "Giveaway",
    giveawaySchema
  );

export default Giveaway;