const express = require("express");
const router = express.Router();
const Spot = require("../models/Spot");

router.get("/spotlist", (req, res) => {
  Spot.find({ type: req.query.breaktypes }).then(data => {
    let arr = data;
    let regions = [...new Set(arr.map(e => e.region))];
    var obj = {};
    regions.forEach(region => {
      return (obj[region] = []);
    });
    let regionName = arr.map(item => {
      return obj[item.region].push(item.name);
    });
    let sortedData = [];
    sortedData.push(obj);
    console.log(obj);
    res.render("spotlist.hbs", { obj });
  });
});

module.exports = router;
