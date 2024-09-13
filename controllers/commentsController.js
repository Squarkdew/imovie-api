const { getUserByToken } = require("../apiFunctions/getUserByToken");
const { movies, comments } = require("../db/models");

class CommentsController {
  constructor() {}

  async add(req, res) {
    try {
      const { token, movieId, comment } = req.body;

      const user = await getUserByToken(token);

      if (user === null) {
        return res.json(false);
      }

      const movie = await movies.findOne({
        where: {
          id: movieId,
        },
      });

      await comments.create({
        movieId: movie.id,
        userId: user.id,
        comment,
      });

      res.json(movie);
    } catch (error) {
      res.json("error");
      console.log(error);
    }
  }

  async delete(req, res) {
    try {
      const { token, id } = req.body;

      const user = await getUserByToken(token);

      if (!user) {
        return res.json(false);
      }

      await comments.destroy({
        where: {
          id: id,
        },
      });

      res.json(true);
    } catch (error) {
      console.log(error);
    }
  }

  async change(req, res) {
    try {
      const { id, comment } = req.body;

      await comments.update(
        {
          comment,
        },
        {
          where: {
            id,
          },
        }
      );

      res.json(true);
    } catch (error) {
      console.log(error);
    }
  }
}

module.exports = new CommentsController();
