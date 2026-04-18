const mongoose = require("../db");

const Task = mongoose.model("Task", {
  type: String,
  name: String,
  status: String
});

module.exports = Task;
