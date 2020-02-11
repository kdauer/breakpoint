const express = require("express");
const router = express.Router();
const Spot = require("../models/Spot");

router.get("/spotlist", (req, res) => {
  //console.log(req.query.breaktypes);

  Spot.find({ type: req.query.breaktypes }).then(data => {
    console.log(data);
  });
  res.render("spotlist.hbs");
});
module.exports = router;
