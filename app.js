const express = require("express");
const app = express();
require("express-async-errors");
const cors = require("cors");
const {register, login} = require("./controllers/auth");

app.use(express.static("build"));
app.use(cors());
app.use(express.json());

app.get("/", (req, res) => res.send("Example Home page!"));
app.post("/user", register);
app.post("/login", login);

module.exports = app;