const express = require("express");
const router = express.Router();
const User = require("../../models/Users");

router.post("/signup", (req, res) => {
  const { username, email, password } = req.body;
  User.findOne({ email })
    .then(user => {
      if (user) {
        res.json({ msg: "the user allrady exist" });
      }
      new User({ username, email, password }).save((err, userdata) => {
        if (err) {
          res.json({ error: err });
        }
        res.json(userdata);
      });
    })
    .catch(err => console.log(err));
});

router.post("/login", (req, res) => {
  const { email, password } = req.body;
  User.findOne({ email })
    .then(user => {
      if (!user) {
        res.json({ msg: "the user not regist yet please sign up" });
      }
      req.session.isLoggedIn = true;
      req.session.user = user;
      res.json(user);
      console.log(req.user);
    })
    .catch(err => console.log(err));
});

router.post("/logout", (req, res) => {
  req.session.destroy();
});

module.exports = router;
