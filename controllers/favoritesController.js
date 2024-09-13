const { getUserByToken } = require("../apiFunctions/getUserByToken");
const { users } = require("../db/models");

class FavoritesController {
  constructor() {}

  async add(req, res) {
    try {
      const { token, currentMovie } = req.body;

      const user = await getUserByToken(token);

      const newFavorites = [currentMovie.id, ...user.favorites];

      await users.update(
        {
          favorites: newFavorites,
        },
        {
          where: {
            login: user.login,
          },
        }
      );

      res.json(true);
    } catch (error) {
      console.log(error);
    }
  }

  async delete(req, res) {
    try {
      const { token, currentMovie } = req.body;

      const user = await getUserByToken(token);

      if (user === null) {
        return res.json(false);
      }

      const newFavorites = user.favorites.filter(
        (el) => el !== currentMovie.id
      );

      console.log(newFavorites);

      await users.update(
        {
          favorites: newFavorites,
        },
        {
          where: {
            login: user.login,
          },
        }
      );
      res.json(true);
    } catch (error) {
      console.log(error);
    }
  }
}

module.exports = new FavoritesController();
