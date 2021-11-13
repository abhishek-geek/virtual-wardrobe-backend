const express = require("express");
const app = express();
require("express-async-errors");
const cors = require("cors");

app.use(express.static("build"));
app.use(cors());
app.use(express.json());

app.get("/", (req, res) => res.send("Example Home page!"));

module.exports = app;