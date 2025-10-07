import mongoose from "mongoose";
const { Schema } = mongoose;

const UserSchema = new Schema({
  name: String,
  email: { type: String, unique: true },
  phone: String,
  passwordHash: String,
  role: { type: String, default: "owner" },
  createdAt: { type: Date, default: Date.now }
});

export default mongoose.model("User", UserSchema);
