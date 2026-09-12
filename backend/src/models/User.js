import mongoose from "mongoose";

const userSchema =
new mongoose.Schema(
    {
       userId: {
        type: String,
        required: true,
        unique: true,
        index: true,
       } ,
       
       displayName: {
        type: String,
        required: true,
       },

       email: {
        type: String,
        required: true,
        unique: true,
        lowercase :true,
        trim: true,
       },

       role: {
        type: String,
        enum: ["USER", "ADMIN"],
        default: "USER",
       },

       balances: {
        VEs: {
            type: Number,
            default: 0,
            min: 0,
        },
        SVEs: {
            type: Number,
            default: 0,
            min: 0,
        },
         Tokens: {
          type: Number,
          default: 0,
          min: 0,
        },
       },

         accountStatus: {
        type: String,
        enum: [
          "ACTIVE",
          "SUSPENDED",
          "BLOCKED",
        ],
        default: "ACTIVE",
      },
    },
    {
        timestamps: true,
    }
);

const User =
mongoose.model(
    "User",
    userSchema
);
export default User;