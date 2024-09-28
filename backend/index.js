const express = require("express");
const cors = require("cors");
const connection = require("./config/db");
const userRouter = require("./controllers/UserController");

require("dotenv").config();

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Connect to Database
connection();

const port = process.env.PORT || 8080;

app.listen(port, () => {
  console.log(`App listening on port ${port}`);
});

// User Routes
app.use("/", userRouter);
