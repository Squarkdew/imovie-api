const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");
const secretKey = process.env.SECRET_KEY;

const { persons } = require("../db/models");

router.post("/", async (req, res) => {
  try {
    const allPersons = await persons.findAll();

    res.json(
      allPersons.map((el) => ({
        id: el.id,
        photo: el.photo,
        name: el.name,
        engName: el.engName,
        birthday: el.birthday,
      }))
    );
  } catch (error) {
    res.json(false);
    console.log(error);
  }
});

module.exports = router;
