const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const { SECRET } = require("../utils/config");
const User = require("../models/User");
const sendEmail = require("../services/Email");
const welcomeEmail = require("../templates/welcome");

const register = async (req, res) => {
  console.log("hit register");
  const {name, email, password} = req.body;
  let user = await User.findOne({ email });
  console.log(user);
  if (user) return res.status(400).send("User already registered.");

  user = new User({name, email, password});
  user.passwordHash = await bcrypt.hash(password, 10);
  await user.save();
  console.log("user saved");

  const token = jwt.sign({name: user.name, id: user._id}, SECRET, { expiresIn: "1d" });

  console.log("registered", token)

  sendEmail(welcomeEmail(), email, name, "Welcome to Virtual Wardrobe");

  res
    .header("token", token)
    .json({data: user, error: false});
}

const login = async (req, res) => {
  console.log(req.body);

  const user = await User.findOne({ email: String(req.body.email) });
  if (!user) {
    console.log(`${req.body.email} does not present. Try Signing up.`);
    return res
      .status(404)
      .json({ message: `${req.body.email} does not present. Try Signing up.`, error: true});
  }

  const verified =  bcrypt.compare(req.body.password, user.passwordHash);

  if (!verified) {
    return res.status(401).send({ error: "Wrong Password" });
  }

  const token = jwt.sign({name: user.name, id: user._id}, SECRET, { expiresIn: "1d" });
  console.log(token);

  return res.send({ token });
}

module.exports = {register, login};