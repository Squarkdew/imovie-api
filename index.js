const express = require("express");
const cors = require("cors");
const app = express();

app.use(
  cors({
    origin: "http://localhost:3000", // Allow only specific origin
    methods: "GET,POST,PUT,DELETE",
    credentials: true, // Enable credentials (cookies, HTTP auth)
  })
);

app.use(express.json());

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

app.listen(process.env.PORT, () =>
  console.log(`Server is running on port ${process.env.PORT}`)
);
