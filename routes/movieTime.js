const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");
const secretKey = process.env.SECRET_KEY;

const { users } = require("../db/models");
const { getUserByToken } = require("../apiFunctions/getUserByToken");

router.post("/save", async (req, res) => {
  try {
    const user = await getUserByToken(req.body.token);

    if (user) {
      const existingMovieIndex = user.moviesTime.findIndex(
        (el) => el.id === req.body.id
      );
      let newMoviesTime;

      if (existingMovieIndex === -1) {
        newMoviesTime = [
          ...user.moviesTime,
          { id: req.body.id, time: req.body.time },
        ];
      } else {
        newMoviesTime = user.moviesTime.map((el) =>
          el.id === req.body.id ? { id: req.body.id, time: req.body.time } : el
        );
      }

      await users.update(
        { moviesTime: newMoviesTime },
        {
          where: {
            id: user.id,
          },
        }
      );

      res.json(true);
    } else {
      res.status(404).json({ error: "User not found" });
    }
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
    console.error(error);
  }
});

router.post("/get", async (req, res) => {
  try {
    const user = await getUserByToken(req.body.token);

    if (user) {
      const existingMovieIndex = user.moviesTime.findIndex(
        (el) => el.id === req.body.id
      );
      let newMoviesTime;

      if (existingMovieIndex === -1) {
        return res.json(false);
      } else {
        res.json(user.moviesTime.find((el) => el.id === req.body.id).time);
      }
    } else {
      res.status(404).json({ error: "User not found" });
    }
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
    console.error(error);
  }
});

module.exports = router;
