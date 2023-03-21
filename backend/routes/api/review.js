const express = require("express");
const { requireAuth } = require("../../utils.js/auth");
const { Review, ReviewImage, Spot, User } = require("../../db/models");
const router = express.Router();

router.get("/current", requireAuth, async (req, res) => {
  const Reviews = await Review.findAll({
    include: [{ model: User }, { model: Spot }, { model: ReviewImage }],
  });
  res.json({ Reviews });
});

module.exports = router;