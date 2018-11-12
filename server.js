const express = require("express");
const mongoose = require("mongoose");
// const cookieSession = require("cookie-session");
// const passport = require("passport");

// const a1 = require("./routes/api/a1");
const keys = require("./config/keys");

mongoose
  .connect(
    keys.mongoURI,
    { useNewUrlParser: true }
  )
  .then(() => console.log("mongodb connected"))
  .catch(err => console.log(err));

const app = express();

// app.use(
//   cookieSession({
//     maxAge: 30 * 24 * 60 * 60 * 1000,
//     keys: [keys.cookieKey]
//   })
// );

// app.use(passport.initialize());
// app.use(passport.session());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// app.use("/api/a1", a1);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`start with port ${PORT}`);
});
