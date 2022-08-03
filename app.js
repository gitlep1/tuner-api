// Dependencies
const express = require("express");
const cors = require("cors");
const songsController = require("./controllers/songController");

// Configuration
const app = express();

// Middlware
app.use(cors());
app.use(express.json());
app.use("/songs", songsController);

// Routes
app.get("/", (req, res) => {
  res.send("Welcome to Tuner");
});

app.get("*", (req, res) => {
  res.status(404).send("No songs found.");
});

module.exports = app;
