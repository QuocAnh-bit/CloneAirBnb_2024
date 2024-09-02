var express = require("express");
var router = express.Router();
const authController = require("../controllers/auth.controller");
const model = require("../models/index");
const { ServerResponse } = require("http");
const passport = require("passport");

router.post("/login", authController.index);
router.post("/register", authController.register);
router.post("/refresh", authController.refresh);
router.post("/logout", authController.logout);

router.get("/google", (req, res) => {
  const emptyResponse = new ServerResponse(req);
  passport.authenticate(
    "google",
    {
      scope: ["email", "profile"],
      session: false,
    },
    (err, user, info) => {
      console.log(err, user, info);
    }
  )(req, emptyResponse);
  const url = emptyResponse.getHeader("location");
  console.log(url);
  return res.status(200).json({
    status: 200,
    message: "Thành công",
    result: {
      urlRedirect: url,
    },
  });
});

router.get(
  "/google/callback",
  passport.authenticate("google", { session: false, failureRedirect: "/" }),
  authController.loginGoogle
);

router.get("/facebook", (req, res) => {
  const emptyResponse = new ServerResponse(req);
  passport.authenticate(
    "facebook",
    {
      scope: ["email", "profile"],
      session: false,
    },
    (err, user, info) => {
      console.log(err, user, info);
    }
  )(req, emptyResponse);
  const url = emptyResponse.getHeader("location");
  console.log(url);
  return res.status(200).json({
    status: 200,
    message: "Thành công",
    result: {
      urlRedirect: url,
    },
  });
});

module.exports = router;
