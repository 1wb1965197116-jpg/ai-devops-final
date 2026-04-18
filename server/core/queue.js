const Task = require("../models/Task");
const engineer = require("../agents/engineer");
const qa = require("../agents/qa");

async function processQueue() {

  const tasks = await Task.find({ status: "pending" });

  let results = [];

  for (let task of tasks) {

    const change = engineer.build(task);

    const valid = qa.check(change);

    if (!valid.ok) {
      task.status = "blocked";
      await task.save();
      continue;
    }

    task.status = "done";
    await task.save();

    results.push({ task, change });
  }

  return results;
}

module.exports = { processQueue };
