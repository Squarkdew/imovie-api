const express = require("express");
const app = express();
const cors = require("cors");

require("dotenv").config();

app.use(express.json());
app.use(cors({ credentials: true, origin: "http://localhost:3000" }));

const postgre = require("../database"); // Ensure this path is correct

app.post("/login", async (req, res) => {
  try {
    const { login, password } = req.body;

    const sql = "INSERT INTO users(login, password) VALUES($1, $2) RETURNING *";

    const { rows } = await postgre.query(sql, [login, password]);

    res.json({ msg: "OK", user: rows[0] });
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
});

app.listen(process.env.PORT || 5000, () =>
  console.log(`Server is running on port ${process.env.PORT || 5000}`)
);
