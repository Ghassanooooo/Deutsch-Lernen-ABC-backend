const express = require("express");
const mongoose = require("mongoose");
const session = require("express-session");
const mongoDBStore = require("connect-mongodb-session")(session);
const user = require("./routes/api/user");
const level = require("./routes/api/level");
const subject = require("./routes/api/subject");
const subjectContent = require("./routes/api/subjectContent");

const keys = require("./config/keys");
const User = require("./models/User");

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

app.use((req, res, next) => {
  if (!req.session.user) {
    return next();
  }
  User.findById(req.session.user._id)
    .then(user => {
      req.user = user;
      next();
    })
    .catch(err => console.log(err));
});
app.use("/api/user", user);
app.use("/api/level", level);
app.use("/api/subject", subject);
app.use("/api/subjectContent", subjectContent);

// app.use("/api/a1", a1);Level

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`start with port ${PORT}`);
});
