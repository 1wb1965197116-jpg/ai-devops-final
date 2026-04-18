const mongoose = require("../db"); // ✅ ONLY THIS

const bcrypt = require("bcrypt");

const UserSchema = new mongoose.Schema({
  email: String,
  password: String,
  role: { type: String, default: "user" }
});

UserSchema.pre("save", async function () {
  this.password = await bcrypt.hash(this.password, 10);
});

UserSchema.methods.compare = function (pw) {
  return bcrypt.compare(pw, this.password);
};

module.exports = mongoose.model("User", UserSchema);
