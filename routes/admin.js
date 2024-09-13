const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");
const { movies, persons } = require("../db/models");
const secretKey = process.env.SECRET_KEY;

router.post("/isAdmin", async (req, res) => {
  try {
    if (req.body.token.length > 0) {
      const decodedData = jwt.verify(req.body.token, secretKey);

      if (decodedData) {
        if (decodedData.login === "squark") {
          return res.json(true);
        } else return res.json(false);
      } else return res.json(false);
    } else {
      return res.json(false);
    }
  } catch (error) {
    res.json(false);
    console.log(error);
  }
});

router.post("/addMovie", async (req, res) => {
  try {
    const {
      title,
      engTitle,
      rating,
      year,
      genre,
      country,
      duration,
      age,
      summary,
      miniSummary,
      budget,
      usFees,
      worldFees,
      worldPremiere,
      video,
      trailerTitle,
      trailerPhoto,
      trailer,
      persons,
      poster,
      searchPoster,
      windowPoster,
      pngTitle,
    } = req.body;
    const trailers = [{ title: trailerTitle, trailer, trailerPhoto }];
    await movies.create({
      title,
      engTitle,
      rating,
      year: Number(year),
      genre,
      country,
      duration,
      age,
      summary,
      miniSummary,
      budget,
      usFees,
      worldFees,
      worldPremiere,
      video,
      trailers,
      persons,
      poster,
      searchPoster,
      windowPoster,
      pngTitle,
    });
    res.json(true);
  } catch (error) {
    res.json(false);
    console.log(error);
  }
});

router.post("/addPerson", async (req, res) => {
  try {
    const {
      name,
      engName,
      photo,
      career,
      birthday,
      birthplace,
      genres,
      height,
      hasOscars,
    } = req.body;
    await persons.create({
      name,
      engName,
      photo,
      career,
      birthday,
      birthplace,
      genres,
      height,
      hasOscars: Number(hasOscars),
    });
    res.json(true);
  } catch (error) {
    res.json(false);
    console.log(error);
  }
});

module.exports = router;
