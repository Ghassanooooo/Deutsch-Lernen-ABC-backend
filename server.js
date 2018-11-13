const express = require("express");
const mongoose = require("mongoose");
const session = require("express-session");
const mongoDBStore = require("connect-mongodb-session")(session);
// const cookieSession = require("cookie-session");
// const passport = require("passport");
const user = require("./routes/api/user");
// const a1 = require("./routes/api/a1");
const keys = require("./config/keys");
const app = express();
const store = new mongoDBStore({
  uri: keys.mongoURI,
  collection: "sessions",
  maxAge: 259200000
});

mongoose
  .connect(
    keys.mongoURI,
    { useNewUrlParser: true }
  )
  .then(() => console.log("mongodb connected"))
  .catch(err => console.log(err));

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
app.use(
  session({
    secret: keys.SessionSecret,
    resave: false,
    saveUninitialized: false,
    store: store,
    cookie: { maxAge: 259200000 }
  })
);
app.use("/api/user", user);
// app.use("/api/a1", a1);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`start with port ${PORT}`);
});
