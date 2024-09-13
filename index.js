const express = require("express");
const cors = require("cors");
const app = express();

const postgre = require("./databse");

app.use(
  cors({
    origin: "http://localhost:3000",
    methods: "GET,POST,PUT,DELETE",
    credentials: true,
  })
);

app.use(express.json());

app.post("/login", async (req, res) => {
  try {
    const { login, password } = req.body;
    const sql =
      "INSERT INTO users(login, password, createdAt) VALUES($1, $2, '12.12.1212') RETURNING *";
    const { rows } = await postgre.query(sql, [login, password]);
    res.json({ msg: "OK", user: rows[0] });
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
});

app.listen(process.env.PORT, () =>
  console.log(`Server is running on port ${process.env.PORT}`)
);
