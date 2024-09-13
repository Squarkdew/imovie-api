const express = require("express");

const router = express.Router();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const secretKey = process.env.SECRET_KEY;

const { users } = require("../db/models");

router.post("/register", async (req, res) => {
  const { login, password } = req.body;

  try {
    const allUsers = await users.findOne({
      where: {
        login: login,
      },
    });

    console.log(allUsers);

    if (allUsers) {
      return res.json("login");
    }

    const hashedPasswordUser = await bcrypt.hash(password, 10);

    await users.create({
      login: login,
      password: hashedPasswordUser,
      favorites: [],
      moviesTime: [],
      favoritePersons: [],
    });

    res.json("registered");
  } catch (error) {
    console.log(error);
  }
});

router.post("/login", async (req, res) => {
  try {
    const { logLogin, logPassword } = req.body;
    const user = await users.findOne({
      where: {
        login: logLogin,
      },
    });

    if (!user) {
      return res.json(false);
    }

    const pswd = await bcrypt.compare(logPassword, user.password);

    if (pswd) {
      const token = jwt.sign({ id: user.id, login: user.login }, secretKey, {
        expiresIn: "7d",
      });
      res.json({ token });
    } else res.json(false);
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Произошла ошибка при входе пользователя." });
  }
});

module.exports = router;
