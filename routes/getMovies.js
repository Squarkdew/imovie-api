const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");
const secretKey = process.env.SECRET_KEY;
const { Op } = require("sequelize");

const { movies, sequelize } = require("../db/models");

router.post("/", async (req, res) => {
  try {
    if (req.body.token.length > 0) {
      const decodedData = jwt.verify(req.body.token, secretKey);

      if (decodedData) {
        const allMovies = await movies.findAll();

        res.json(
          allMovies.map((el) => ({
            id: el.id,
            title: el.title,
            engTitle: el.engTitle,
            rating: el.rating,
            year: el.year,
            country: el.country,
            duration: el.duration,
            miniSummary: el.miniSummary,
            genre: el.genre,
            video: el.video,
            poster: el.poster,
            searchPoster: el.searchPoster,
            windowPoster: el.windowPoster,
            pngTitle: el.pngTitle,
            age: el.age,
          }))
        );
      } else return res.json(false);
    } else {
      const allMovies = await movies.findAll();

      res.json(
        allMovies.map((el) => ({
          id: el.id,
          title: el.title,
          engTitle: el.engTitle,
          rating: el.rating,
          year: el.year,
          country: el.country,
          duration: el.duration,
          miniSummary: el.miniSummary,
          genre: el.genre,
          video: el.video,
          poster: el.poster,
          searchPoster: el.searchPoster,
          windowPoster: el.windowPoster,
          pngTitle: el.pngTitle,
          age: el.age,
        }))
      );
    }
  } catch (error) {
    res.json(false);
    console.log(error);
  }
});
router.post("/categoryMovies", async (req, res) => {
  try {
    if (req.body.token.length > 0) {
      const decodedData = jwt.verify(req.body.token, secretKey);

      if (decodedData) {
        const filteredMovies = await movies.findAll({
          where: {
            genre: {
              [Op.iLike]: `%${req.body.category.toLowerCase()}%`,
            },
          },
        });

        console.log(req.body.category);

        res.json(
          filteredMovies.map((el) => ({
            id: el.id,
            poster: el.poster,
          }))
        );
      } else return res.json(false);
    } else {
      const filteredMovies = await movies.findAll({
        where: {
          genre: {
            [Op.iLike]: `%${req.body.category.toLowerCase()}%`,
          },
        },
      });

      console.log(req.body.category);

      res.json(
        filteredMovies.map((el) => ({
          id: el.id,
          poster: el.poster,
        }))
      );
    }
  } catch (error) {
    res.json(false);
    console.log(error);
  }
});

module.exports = router;
