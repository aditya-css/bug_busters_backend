const mongoose = require("mongoose");
import mongoose from "mongoose";
import bcrypt from "bcryptjs";

const UserSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
      minlength: 3,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      lowercase: true,
    },
    password: {
      type: String,
      required: true,
      minlength: 8,
      trim: true,
    },
    publicAddress: {
      type: String,
      trim: true,
    },
    totalRewards: {
      type: Number,
    },
  },
  {
    timestamps: true,
  }
);
// hashing password
UserSchema.pre("save", async function (next) {
  const user = this;

  user.password = await bcrypt.hash(user.password, 8);

  next();
});

// admin create

export const User = mongoose.model("User", UserSchema);
