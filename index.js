const app = require("./app");
const mongoose = require("mongoose");
const { MONGODB_URI, PORT } = require("./utils/config");

mongoose.connect(
  MONGODB_URI,
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
    useCreateIndex: true,
  },
  () => {
    console.log(`connected to mongodb on port ${PORT}`);
  }
);

app.get("/ping", (req, res) => {
  res.send("pong");
});

app.use((err, req, res, next) => {
  try {
    console.log("stack", err);
    const req_body = JSON.stringify(req.body);
    console.log(req_body);
    const req_headers = JSON.stringify(req.headers);
    console.log(req_headers);
    console.error('Internal Server Error');
    res.status(500).send('500. Internal Server Error');
    next();
  } catch (e) {
    console.log(e);
  }
});

app.listen(PORT, () => {
  console.log(`connecting to port ${PORT}...`);
});