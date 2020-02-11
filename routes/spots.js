const express = require("express");
const router = express.Router();
const Spot = require("../models/Spot");

router.get("/spotlist", (req, res) => {
  Spot.find({ type: req.query.breaktypes }).then(data => {
    // console.log(data);
    let arr = data;
    let regions = [...new Set(arr.map(e => e.region))];
    var obj = {};
    regions.forEach(region => {
      return (obj[region] = []);
    });
    let regionName = arr.map(item => {
      return obj[item.region].push({
        name: item.name,
        id: item.id,
        objId: item._id,
        type: item.type
      });
    });
    let sortedData = [];
    sortedData.push(obj);
    // console.log(obj);
    res.render("spotlist.hbs", { obj });
  });
});

router.get("/spotlist/detail/:id", (req, res) => {
  Spot.find({ id: req.params.id }).then(info => {
    console.log("here", info);
    res.render("detail.hbs", { info });
  });
});

module.exports = router;
