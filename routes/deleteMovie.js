const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");
const secretKey = process.env.SECRET_KEY;

const { movies } = require("../db/models");

router.post("/", async (req, res) => {
  try {
    await movies.destroy({
      where: {
        id: req.body.id,
      },
    });

    res.json(true);
  } catch (error) {
    res.json(false);
    console.log(error);
  }
});

module.exports = router;
