const express = require("express");
const bcrypt = require("bcryptjs");
const { validationResult } = require("express-validator/check");
const validation = require("../../validation/userValidation");
const router = express.Router();
const User = require("../../models/User");
const authUser = require("../../middlewares/login");

router.post("/signup", validation.signup, async (req, res) => {
  const { username, email, password } = req.body;
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(422).json({ error: errors.array() });
  }
  const hashedPassword = await bcrypt.hash(password, 12);
  if (hashedPassword) {
    return new User({
      username,
      email,
      password: hashedPassword
    }).save((err, userdata) => {
      if (err) {
        return res.status(422).json({ error: err });
      }
      return res.status(201).json(userdata);
    });
  }
});

router.post("/login", validation.login, async (req, res, next) => {
  const { email } = req.body;
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(422).json({ error: errors.array() });
  }
  try {
    const user = await User.findOne({ email });
    if (user) {
      req.session.isLoggedIn = true;
      req.session.user = user;
      return res.status(200).json(user);
    }
  } catch (e) {
    const error = new Error(e);
    error.httpStateCode = 500;
    return next(error);
  }
});

router.get("/current-user", authUser, async (req, res, next) => {
  try {
    const user = await User.findOne({ email: req.user.email });
    if (user) {
      return res.status(200).json(user);
    }
  } catch (e) {
    const error = new Error(e);
    error.httpStateCode = 500;
    return next(error);
  }
});

router.post("/logout", (req, res) => {
  req.session.destroy();
});

module.exports = router;
