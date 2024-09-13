const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");
const secretKey = process.env.SECRET_KEY;

const { movies } = require("../db/models");

router.post("/", async (req, res) => {
  try {
    const allMovies = await movies.findAll();

    const newMovies = [];

    if (allMovies.length !== 0) {
      allMovies.forEach((movie) => {
        movie.persons.forEach((person) => {
          if (person.personId == req.body.personId) {
            newMovies.push(movie);
          }
        });
      });
    }

    res.json(
      newMovies.map((el) => ({
        id: el.id,
        title: el.title,
        genre: el.genre,
        searchPoster: el.searchPoster,
        year: el.year,
      }))
    );
  } catch (error) {
    res.json(false);
    console.log(error);
  }
});

module.exports = router;
