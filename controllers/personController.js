const { getUserByToken } = require("../apiFunctions/getUserByToken");
const { users, persons, sequelize } = require("../db/models");

class PersonController {
  constructor() {}

  async add(req, res) {
    try {
      const { token, id } = req.body;

      const user = await getUserByToken(token);
      if (user === null) {
        return res.json(false);
      }

      const newPersons = [id, ...user.favoritePersons];

      await users.update(
        {
          favoritePersons: newPersons,
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
      const { token, id } = req.body;

      const user = await getUserByToken(token);

      if (user === null) {
        return res.json(false);
      }

      const newPersons = user.favoritePersons.filter((el) => el !== id);

      await users.update(
        {
          favoritePersons: newPersons,
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

  async get(req, res) {
    try {
      const { token } = req.body;

      const user = await getUserByToken(token);

      if (user === null) {
        return res.json(false);
      }

      const favPersons = await persons.findAll({
        where: {
          id: user.favoritePersons,
        },
      });

      const sortedFavorites = user.favoritePersons.map((id) =>
        favPersons.find((person) => person.id === id)
      );

      res.json(sortedFavorites);
    } catch (error) {
      console.log(error);
    }
  }
}

module.exports = new PersonController();
