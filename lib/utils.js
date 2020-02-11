function wind(obj) {
  let direction;
  if (obj.direction > 11.25 && obj.direction <= 33.75) {
    direction = "NNE";
  } else if (obj.direction > 33.75 && obj.direction <= 56.25) {
    direction = "ENE";
  } else if (obj.direction > 56.25 && obj.direction <= 78.75) {
    direction = "E";
  } else if (obj.direction > 78.75 && obj.direction <= 101.25) {
    direction = "ESE";
  } else if (obj.direction > 101.25 && obj.direction <= 123.75) {
    direction = "ESE";
  } else if (obj.direction > 123.75 && obj.direction <= 146.25) {
    direction = "SE";
  } else if (obj.direction > 146.25 && obj.direction <= 168.75) {
    direction = "SSE";
  } else if (obj.direction > 168.75 && obj.direction <= 191.25) {
    direction = "S";
  } else if (obj.direction > 191.25 && obj.direction <= 213.75) {
    direction = "SSW";
  } else if (obj.direction > 213.75 && obj.direction <= 236.25) {
    direction = "SW";
  } else if (obj.direction > 236.25 && obj.direction <= 258.75) {
    direction = "WSW";
  } else if (obj.direction > 258.75 && obj.direction <= 281.25) {
    direction = "W";
  } else if (obj.direction > 281.25 && obj.direction <= 303.75) {
    direction = "WNW";
  } else if (obj.direction > 303.75 && obj.direction <= 326.25) {
    direction = "NW";
  } else if (obj.direction > 326.25 && obj.direction <= 348.75) {
    direction = "NNW";
  } else {
    direction = "N";
  }
  let speed = `${obj.speed} km/h`;
  return { direction, speed, degree: obj.direction };
}

function convertTSnext(obj) {
  dateObj = new Date(obj.tide.next.timestamp * 1000);
  utcString = dateObj.toUTCString();
  time = utcString.slice(-11, -7);
  return time;
}

function nextTide(obj) {
  let type = obj.tide.next.type;
  let height = obj.tide.next.height;

  return { type, height };
}

module.exports = { convertTSnext };
module.exports = { nextTide };
module.exports = { wind };
