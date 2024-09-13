const { getUserByToken } = require("../apiFunctions/getUserByToken");
const { users, persons, sequelize, movies, ratings } = require("../db/models");

class RatingController {
  constructor() {}

  async add(req, res) {
    try {
      const { token, movieId, rating } = req.body;

      const user = await getUserByToken(token);
      if (user === null) {
        return res.json(false);
      }

      const thereIs = await ratings.findOne({
        where: {
          userId: user.id,
          movieId,
        },
      });

      if (thereIs) {
        await ratings.update(
          {
            rating,
          },
          {
            where: {
              userId: user.id,
              movieId,
            },
          }
        );
      } else {
        await ratings.create({ userId: user.id, movieId, rating });
      }

      res.json(true);
    } catch (error) {
      console.log(error);
    }
  }

  async delete(req, res) {
    try {
      const { token, movieId } = req.body;

      const user = await getUserByToken(token);

      if (user === null) {
        return res.json(false);
      }

      await ratings.destroy({
        where: {
          userId: user.id,
          movieId,
        },
      });
      res.json(true);
    } catch (error) {
      console.log(error);
    }
  }

  async get(req, res) {
    try {
      const { token, movieId } = req.body;

      const user = await getUserByToken(token);

      if (user === null) {
        return res.json(false);
      }

      const allRates = await ratings.findAll({
        where: {
          movieId,
        },
      });

      const userRate = allRates.find(
        (el) => el.userId == user.id && el.movieId == movieId
      );

      res.json({ allRates, userRate });
    } catch (error) {
      console.log(error);
    }
  }
}

module.exports = new RatingController();
