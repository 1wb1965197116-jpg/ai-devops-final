const Task = require("../models/Task");
const Log = require("../models/Log");
const { processQueue } = require("./queue");

async function runAI() {

  await Task.create({
    type: "auto",
    name: "system check",
    status: "pending"
  });

  const result = await processQueue();

  await Log.create({
    message: "AI executed cycle"
  });

  return result;
}

module.exports = { runAI };
