const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");
const secretKey = process.env.SECRET_KEY;

const { movies, persons, sequelize } = require("../db/models");

router.post("/persons", async (req, res) => {
  try {
    if (req.body.token !== "") {
      const decodedData = jwt.verify(req.body.token, secretKey);

      if (decodedData) {
        const movie = await movies.findOne({
          where: {
            id: req.body.movieId,
          },
        });
        const personsIds = movie.persons.map((el) => el.personId);

        const orderCase = `CASE id ${personsIds
          .map((id, index) => `WHEN ${id} THEN ${index}`)
          .join(" ")} END`;

        const moviePersons = await persons.findAll({
          where: {
            id: personsIds,
          },
          order: sequelize.literal(orderCase),
        });

        res.json(moviePersons);
      }
    } else {
      const movie = await movies.findOne({
        where: {
          id: req.body.movieId,
        },
      });
      const personsIds = movie.persons.map((el) => el.personId);
      console.log(personsIds);

      const orderCase = `CASE id ${personsIds
        .map((id, index) => `WHEN ${id} THEN ${index}`)
        .join(" ")} END`;

      const moviePersons = await persons.findAll({
        where: {
          id: personsIds,
        },
        order: sequelize.literal(orderCase),
      });

      res.json(moviePersons);
    }
  } catch (error) {
    res.json(false);
    console.log(error);
  }
});

router.post("/person", async (req, res) => {
  try {
    if (req.body.token !== "") {
      const decodedData = jwt.verify(req.body.token, secretKey);

      if (decodedData) {
        const person = await persons.findOne({
          where: {
            id: req.body.personId,
          },
        });

        res.json(person);
      }
    } else {
      const person = await persons.findOne({
        where: {
          id: req.body.personId,
        },
      });

      res.json(person);
    }
  } catch (error) {
    res.json(false);
    console.log(error);
  }
});

router.post("/currentMovie", async (req, res) => {
  try {
    const currentMovie = await movies.findOne({
      where: {
        id: req.body.movieId,
      },
    });
    res.json(currentMovie);
  } catch (error) {
    res.json(false);
    console.log(error);
  }
});

module.exports = router;
