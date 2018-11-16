const express = require("express");
const bcrypt = require("bcryptjs");
const { validationResult } = require("express-validator/check");
const validation = require("../../validation/userValidation");
const router = express.Router();
const User = require("../../models/User");

router.post("/signup", validation.signup, (req, res) => {
  const { username, email, password } = req.body;
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(422).json({ error: errors.array() });
  }
  return bcrypt.hash(password, 12).then(hashedPassword => {
    new User({
      username,
      email,
      password: hashedPassword
    }).save((err, userdata) => {
      if (err) {
        return res.json({ error: err });
      }
      return res.json(userdata);
    });
  });
});

router.post("/login", validation.login, (req, res, next) => {
  const { email } = req.body;
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(422).json({ error: errors.array() });
  }
  User.findOne({ email })
    .then(user => {
      req.session.isLoggedIn = true;
      req.session.user = user;
      return res.json({ msg: "weeeeeeeee" });
    })
    .catch(e => {
      const error = new Error(e);
      error.httpStateCode = 500;
      return next(error);
    });
});

router.post("/logout", (req, res) => {
  req.session.destroy();
});

module.exports = router;
