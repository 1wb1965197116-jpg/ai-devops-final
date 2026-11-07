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

// Automatic agent execution is disabled pending security review.

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log("🧠 AI DevOps FINAL running on port", PORT);
});
