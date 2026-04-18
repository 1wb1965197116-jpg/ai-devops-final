const { setToken, getToken } = require("./tokenVault");
const { createMongoDB } = require("./mongoEngine");
const { setRenderEnv } = require("./renderEngine");

async function runCommand(cmd) {

  const text = cmd.toLowerCase();

  // SAVE TOKEN
  if (text.includes("store token")) {
    setToken("GENERIC", cmd.value);
    return "Token stored";
  }

  // CREATE MONGO
  if (text.includes("create mongo")) {
    return await createMongoDB();
  }

  // SEND TO RENDER
  if (text.includes("render")) {
    const val = getToken("GENERIC");
    return await setRenderEnv("API_KEY", val);
  }

  return "Command not recognized";
}

module.exports = { runCommand };
