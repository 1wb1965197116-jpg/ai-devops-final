const Task = require("../models/Task");
const { processQueue } = require("./queue");

async function runAI() {

  await Task.create({
    type: "feature",
    name: "fix login bug",
    status: "pending"
  });

  const result = await processQueue();

  return result;
}

module.exports = { runAI };
