const fetch = require("node-fetch");

// Trigger Render deploy
async function deployRender() {
  await fetch(process.env.RENDER_HOOK);
}

// Trigger Vercel deploy
async function deployVercel() {
  await fetch(process.env.VERCEL_HOOK);
}

module.exports = { deployRender, deployVercel };
