const express = require("express");
const { movies, users, comments } = require("../db/models");
const router = express.Router();

router.post("/", async (req, res) => {
  try {
    const allComments = await comments.findAll({
      where: { movieId: req.body.movieId },
    });

    const userIds = allComments.map((el) => el.userId);

    const usersByComments = await users.findAll({
      where: { id: userIds },
    });

    console.log(usersByComments);

    const joinedComs = allComments.map((el) => {
      const user = usersByComments.find((user) => user.id === el.userId);
      if (!user) {
        return {
          id: el.id,
          userId: el.userId,
          login: "Удаленный аккаунт",
          comment: el.comment,
          createdAt: el.createdAt,
        };
      }
      return {
        id: el.id,
        userId: el.userId,
        login: user.login,
        avatar: user.avatar,
        comment: el.comment,
        createdAt: el.createdAt,
      };
    });

    res.json(joinedComs.reverse());
  } catch (error) {
    console.error("Ошибка:", error);
    res.status(500).json({ message: "Произошла ошибка", error: error.message });
  }
});

module.exports = router;
