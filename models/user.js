import mongoose from "mongoose";

const user = mongoose.Schema(
  {
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
  },
  { timestamps: true }
);

const User = mongoose.model("User", user);
export default User;
