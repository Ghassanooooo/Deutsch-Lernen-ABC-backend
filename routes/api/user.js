const express = require("express");
const bcrypt = require("bcryptjs");
const { check, validationResult } = require("express-validator/check");
const router = express.Router();
const User = require("../../models/User");

router.post(
  "/signup",
  check("email", "Invalid Email").isEmail(),
  (req, res) => {
    const { username, email, password, confirmPassword } = req.body;
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(422).json({ msg: errors.array()[0].msg });
    }
    User.findOne({ email })
      .then(user => {
        if (user) {
          return res.json({ msg: "the user allrady exist" });
        }
        if (password !== confirmPassword) {
          return res.json({ msg: "the password is not confirm" });
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
      })
      .catch(err => console.log(err));
  }
);

router.post("/login", (req, res) => {
  const { email, password } = req.body;
  User.findOne({ email })
    .then(user => {
      if (!user) {
        return res.json({ msg: "the email or password is not valid" });
      }
      return bcrypt.compare(password, user.password).then(isMatsh => {
        if (isMatsh) {
          req.session.isLoggedIn = true;
          req.session.user = user;
          return res.json(user);
          console.log(req.user);
        }
        return res.json({ msg: "the email or password is not valid" });
      });
    })
    .catch(err => console.log(err));
});

router.post("/logout", (req, res) => {
  req.session.destroy();
});

module.exports = router;
