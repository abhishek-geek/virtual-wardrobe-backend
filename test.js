const User = require("./models/User");
const mongoose = require("mongoose");
const { MONGODB_URI, PORT } = require("./utils/config");

mongoose.connect(
  MONGODB_URI,
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    // useFindAndModify: false,
    // useCreateIndex: true,
  },
  () => {
    console.log(`connected to mongodb..`);
  }
);


const test = async () => {
  try {
    console.log(1);
    const users = await User.find({});
    console.log(2);
    console.log(users);
    console.log(3);
  } catch(e){console.log(e);}
}

test();