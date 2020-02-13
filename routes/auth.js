const express = require("express");
const passport = require("passport");
const router = express.Router();
const User = require("../models/User");
const Spots = require("./spots");

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
          console.log(newUser);
          res.redirect("/auth/login");
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

router.post("/auth/user/favourites/:id", (req, res, next) => {
  // console.log(req.params);
  User.findById(req.user._id)
    .then(user => {
      if (!user.favourites.includes(req.params.id)) {
        User.findByIdAndUpdate(
          req.user._id,
          {
            $push: { favourites: req.params.id }
          },
          { new: true }
        )
          .populate({ path: "favourites" })
          .then(result => {
            res.json();
            // res.render("auth/user.hbs", { result: result });
          })

          .catch(err => {
            next(err);
          });
      } else {
        res.json();
      }
    })
    .catch(err => {
      console.log(err);
    });
});

router.get("/auth/user", (req, res) => {
  User.findById(req.user._id)
    .populate({ path: "favourites" })
    .then(result => {
      console.log("here are the results", result);
      res.render("auth/user.hbs", { result: result });
    });
});

module.exports = router;
