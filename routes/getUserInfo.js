const express = require("express");
const router = express.Router();
const { getUserByToken } = require("../apiFunctions/getUserByToken");

const { movies, comments } = require("../db/models");

router.post("/", async (req, res) => {
  try {
    const { token } = req.body;

    const user = await getUserByToken(token);

    if (user) {
      res.json({ login: user.login, avatar: user.avatar });
    }
  } catch (error) {
    console.log(error);
  }
});

router.post("/getUserComments", async (req, res) => {
  try {
    const { token } = req.body;

    const user = await getUserByToken(token);

    if (!user) {
      res.json(false);
    }

    const userComments = await comments.findAll({
      where: {
        userId: user.id,
      },
    });

    const comMovies = userComments.map((el) => el.movieId);

    const userCommentsMovies = await movies.findAll({
      where: {
        id: comMovies,
      },
    });

    if (user) {
      res.json({ userComments, userCommentsMovies });
    }
  } catch (error) {
    console.log(error);
  }
});

module.exports = router;
