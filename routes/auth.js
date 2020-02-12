const express = require("express");
const passport = require("passport");
const router = express.Router();
const User = require("../models/User");

const bcrypt = require("bcrypt");
const bcryptSalt = 10;

router.get("/auth/login", (req, res, next) => {
  res.render("auth/login", { message: req.flash("error") });
});

router.post(
  "/auth/login",
  passport.authenticate("local", {
    successRedirect: "/auth/user",
    failureRedirect: "/auth/login",
    failureFlash: true,
    passReqToCallback: true
  })
);

router.get("/auth/signup", (req, res, next) => {
  res.render("../views/auth/signup.hbs");
});

router.post("/signup", (req, res, next) => {
  const username = req.body.username;
  const password = req.body.password;

  if (username === "" || password === "") {
    res.render("auth/signup", { message: "Indicate username and password" });
    return;
  }

  User.findOne({ username })
    .then(user => {
      if (user !== null) {
        res.render("auth/signup", { message: "The username already exists" });
        return;
      }

      const salt = bcrypt.genSaltSync(bcryptSalt);
      const hashPass = bcrypt.hashSync(password, salt);

      const newUser = new User({
        username,
        password: hashPass
      });

      newUser.save(err => {
        if (err) {
          res.render("auth/signup", { message: "Something went wrong" });
        } else {
          res.redirect("/auth/user");
        }
      });
    })
    .catch(error => {
      next(error);
    });
});

router.get("/logout", (req, res) => {
  req.logout();
  res.redirect("/");
});

router.post("/auth/user/:id", (req, res) => {
  User.findByIdAndUpdate(
    req.user._id,
    {
      $push: { favourites: req.params.id }
    },
    { new: true }
  ).then(result => {
    result.populate("favourites");
    console.log(result);
    res.render("auth/user.hbs");
  });
});

router.get("/auth/user", (req, res) => {
  res.render("auth/user.hbs");
});

module.exports = router;
