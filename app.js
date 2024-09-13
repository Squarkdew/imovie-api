require("dotenv").config();
const express = require("express");
const cors = require("cors");

const { movies, persons, comments } = require("./db/models");

const app = express();
const PORT = 3001;

const path = require("path");

app.use(cors({ credentials: true, origin: "http://localhost:3000" }));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/movies", express.static(path.join(__dirname, "/movies")));
app.use("/persons", express.static(path.join(__dirname, "/persons")));
app.use("/avatars", express.static(path.join(__dirname, "/avatars")));

const getMovies = require("./routes/getMovies");
const getPersons = require("./routes/getPersons");

const getMovie = require("./routes/getMovie");
const getPersonMovies = require("./routes/getPersonMovies");
const admin = require("./routes/admin");
const deleteMovie = require("./routes/deleteMovie");

const authRoute = require("./routes/auth");
const commentsRoute = require("./routes/commentsRoute");
const personRoute = require("./routes/personRoute");
const ratingRoute = require("./routes/ratingRoute");

const getUserInfo = require("./routes/getUserInfo");

const getFavoritesMovies = require("./routes/getFavoritesMovies");
const personalRoute = require("./routes/personalRoute");
const getComments = require("./routes/getComments");
const movieTime = require("./routes/movieTime");
const avatarRoute = require("./routes/avatarRoute");

app.use("/getMovies", getMovies);
app.use("/getPersons", getPersons);
app.use("/movieTime", movieTime);
app.use("/admin", admin);
app.use("/deleteMovie", deleteMovie);

app.use("/getComments", getComments);
app.use("/getPersonMovies", getPersonMovies);

app.use("/getMovie", getMovie);
app.use("/getFavoritesMovies", getFavoritesMovies);
app.use("/auth", authRoute);
app.use("/comments", commentsRoute);
app.use("/rating", ratingRoute);

app.use("/getUserInfo", getUserInfo);
app.use("/avatar", avatarRoute);

app.use("/favorites", personalRoute);
app.use("/person", personRoute);

const updateFilm = async (id, change) => {
  await movies.update(
    {
      ratings: change,
    },
    {
      where: {
        id,
      },
    }
  );
};

// updateFilm(10, []);

app.listen(PORT, () => {
  console.log(`Server has been started on PORT`, PORT);
});
