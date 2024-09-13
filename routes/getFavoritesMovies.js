const express = require("express");
const router = express.Router();
const { getUserByToken } = require("../apiFunctions/getUserByToken");

const { movies, sequelize } = require("../db/models");

router.post("/", async (req, res) => {
  try {
    if (req.body.token !== "") {
      const { token } = req.body;

      const user = await getUserByToken(token);

      if (user === null) {
        return res.json(false);
      }

      const favoritesMovies = await movies.findAll({
        where: {
          id: user.favorites,
        },
      });

      const sortedFavorites = user.favorites.map((id) =>
        favoritesMovies.find((movie) => movie.id === id)
      );

      res.json(sortedFavorites);
    } else res.json("notoken");
  } catch (error) {
    console.log(error);
  }
});

module.exports = router;
