const express = require("express");
const router = express.Router();
const axios = require("axios");
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

const funcs = require("../lib/utils");

router.get("/spotlist/detail/:id", (req, res) => {
  Spot.find({ id: req.params.id }).then(info => {
    // console.log("here", info);
    return axios
      .get(
        `https://services.surfline.com/kbyg/spots/reports?spotId=${req.params.id}`
      )
      .then(responseFromAPI => {
        let overview = responseFromAPI.data.forecast;
        const windInfo = funcs.wind(overview.wind);
        const tideTime = funcs.convertTSnext(overview.tide);
        const nextTideInfo = funcs.nextTide(overview.tide);
        // res.json(responseFromAPI.data.forecast);
        res.render("detail.hbs", {
          overview,
          windInfo,
          tideTime,
          nextTideInfo
        });
      });
  });
});

module.exports = router;
