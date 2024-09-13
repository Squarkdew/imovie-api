const express = require("express");
const router = express.Router();
const { getUserByToken } = require("../apiFunctions/getUserByToken");

const { movies, comments, users } = require("../db/models");

router.post("/change", async (req, res) => {
  try {
    const { token, img } = req.body;

    const user = await getUserByToken(token);

    if (user) {
      await users.update(
        {
          avatar: img,
        },
        {
          where: {
            login: user.login,
          },
        }
      );
      res.json(true);
    }
  } catch (error) {
    console.log(error);
  }
});

module.exports = router;
