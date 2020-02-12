const express = require("express");
const router = express.Router();
const axios = require("axios");
const Spot = require("../models/Spot");

router.get("/spotlist", (req, res) => {
  // console.log(req.query);
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
router.get("/spotlist/forecast/:id", (req, res) => {
  Spot.find({ id: req.params.id }).then(() => {
    // console.log("here", info);
    return axios
      .get(
        `https://services.surfline.com/kbyg/spots/forecasts/wave?spotId=${req.params.id}`
      )
      .then(responseForecastAPI => {
        // console.log(responseForecastAPI.data);
        const forecast = funcs.waveForecast(responseForecastAPI.data.data.wave);
        let chartTime = forecast[0];
        let convertTime = funcs.convertTS(chartTime);
        let chartMax = forecast[1];
        let chartMin = forecast[2];
        // console.log(forecast);
        res.send({ convertTime, chartMax, chartMin });
      });
  });
});

router.get("/spotlist/detail/:id", (req, res) => {
  Spot.find({ id: req.params.id }).then(info => {
    // console.log("here", info);
    return axios
      .get(
        `https://services.surfline.com/kbyg/spots/reports?spotId=${req.params.id}`
      )
      .then(responseFromAPI => {
        let overview = responseFromAPI.data.forecast;
        let spotInfo = responseFromAPI.data.spot;
        const windInfo = funcs.wind(overview.wind);
        const tideTimeprev = funcs.convertTSprevious(overview);
        const previousTideInfo = funcs.previousTide(overview);
        const tideTime = funcs.convertTSnext(overview);
        const nextTideInfo = funcs.nextTide(overview);
        const waveInfo = funcs.wave(overview);
        const weather = funcs.weatherIcon(overview);
        const location = JSON.stringify(funcs.coordinates(spotInfo));
        const levels = funcs.ability(spotInfo);
        const boards = funcs.boardType(spotInfo);
        const swellInfo = funcs.swell(overview.swells);
        //  console.log(swellInfo);
        // res.json(responseFromAPI.data.forecast);
        return axios
          .get(`https://api.surfline.com/v1/mobile/report/${spotInfo.legacyId}`)
          .then(responsefromLegacyAPI => {
            // let ideal = responsefromLegacyAPI.data;
            // console.log(responsefromLegacyAPI);

            let ideal = responsefromLegacyAPI.data[0].travel.best;
            res.render("detail.hbs", {
              layout: false,
              info,
              overview,
              spotInfo,
              windInfo,
              tideTimeprev,
              previousTideInfo,
              tideTime,
              nextTideInfo,
              waveInfo,
              weather,
              location,
              levels,
              boards,
              ideal,
              swellInfo
            });
          });
      });
  });
});

module.exports = router;
