const express = require("express");

try {
  require("dotenv").config();
} catch {}

require("./db");

const aiRoutes = require("./routes/ai");

const app = express();
app.use(express.json());
app.use(express.static("client"));

app.use("/ai", aiRoutes);

// SAFE CRON (won’t crash if missing)
try {
  const cron = require("node-cron");
  const { runAI } = require("./core/orchestrator");

  cron.schedule("*/5 * * * *", async () => {
    console.log("🔁 Auto AI running...");
    await runAI();
  });

} catch {
  console.log("Cron not loaded");
}

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log("🧠 AI DevOps FINAL running on port", PORT);
});
