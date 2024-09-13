const express = require("express");
const app = express();

require("dotenv").config();

app.use(express.json());

const bookRouter = require("./routes/personalRoute");

app.use("/api/v1/books", bookRouter);

app.listen(process.env.PORT, () =>
  console.log("Server is running on port 3333")
);
