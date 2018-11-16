const { check, body } = require("express-validator/check");
const User = require("../models/User");
exports.signin = [
  check("email")
    .isEmail()
    .withMessage("Invalid Email")
    .isLength({ max: 255 })
    .withMessage("Email max length 255")
    .custom((value, { req }) => {
      return User.findOne({ email: value }).then(user => {
        if (user) {
          return Promise.reject("the user alrady exist");
        }
      });
    }),
  body("password")
    .isAlphanumeric()
    .withMessage("password accept numbers and text")
    .isLength({ min: 5, max: 50 })
    .withMessage("password min length 5 and max  length 50"),
  body("confirmPassword").custom((value, { req }) => {
    if (value !== req.body.password) {
      throw new Error("the password is not confirm");
    }
    return true;
  })
];
