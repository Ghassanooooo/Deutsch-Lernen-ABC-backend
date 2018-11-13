const express = require("express");
//const passport = require("passport");
const router = express.Router();
// const keys = require("../../config/keys");

router.post("/signup", (req, res) => {
  res.json({ msg: "the user sign up" });
});

router.post("/login", (req, res) => {
  // res.setHeader("Set-Cookie", "loggedIn=true;Max-Age=2592000000");
  // console.log(req.get("Cookie"));
  //   res.setHeader("Set-Cookie", "loggedIn=true;HttpOnly");
  //   console.log(
  //     req
  //       .get("Cookie")
  //       .trim()
  //       .split(";")[0]
  //       .split("=")[1]
  //   );
  req.session.isLoggedIn = true;
  res.json({ msg: "the user log in" });
  console.log(req.session);
  console.log(req.session.isLoggedIn);
});

// router.get(
//   "/auth/google",
//   passport.authenticate("google", { scope: ["profile", "email"] }),
//   (req, res) => {
//     console.log("ggggggggggggg ", req.user);
//     res.send(req.user);
//   }
// );

// router.get(
//   "/auth/google/callback",
//   passport.authenticate("google"),
//   (req, res) => {
//     res.redirect(keys.authRedirect);
//   }
// );

// router.get("/logout", (req, res) => {
//   req.logout();

//   res.redirect(keys.authRedirect);
// });
// router.get("/current_user", (req, res) => {
//   console.log("ggggggggggggg ", req.user);
//   res.json(req.user);
// });

module.exports = router;
