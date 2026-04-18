const express = require("express");
const { createPR } = require("../core/githubEngine");

const router = express.Router();

router.post("/pr", async (req, res) => {

  const { repo, branch } = req.body;

  const result = await createPR(repo, branch);

  res.json(result);
});

module.exports = router;
