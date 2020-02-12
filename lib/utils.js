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

  if (!obj.speed) return { direction, degree: obj.direction };
  let speed = `${obj.speed} km/h`;
  return { direction, speed, degree: obj.direction };
}

function convertTSprevious(obj) {
  dateObj = new Date(obj.tide.previous.timestamp * 1000);
  utcString = dateObj.toUTCString();
  time = utcString.slice(-12, -7);
  return time;
}

function previousTide(obj) {
  let type = obj.tide.previous.type.toLowerCase();
  let height = obj.tide.previous.height;

  return { type, height };
}
function convertTSnext(obj) {
  dateObj = new Date(obj.tide.next.timestamp * 1000);
  utcString = dateObj.toUTCString();
  time = utcString.slice(-12, -7);
  return time;
}

function nextTide(obj) {
  let type = obj.tide.next.type.toLowerCase();
  let height = obj.tide.next.height;

  return { type, height };
}

function wave(obj) {
  let string = obj.waveHeight.humanRelation.split(" – ");
  let height = string[0];
  let relation = string[1];
  let result = { height, relation };
  return result;
}

function weatherIcon(obj) {
  let icon = obj.weather.condition;
  let iconLink = `https://wa.cdn-surfline.com/quiver/0.6.2/weathericons/${icon}.svg`;
  return iconLink;
}

function coordinates(obj) {
  let x = obj.lon;
  let y = obj.lat;
  let coord = { x, y };
  return coord;
}

function ability(obj) {
  let levels = obj.abilityLevels.join(", ").toLowerCase();
  return levels;
}

function boardType(obj) {
  let types = obj.boardTypes.join(", ").toLowerCase();
  return types;
}
function swell(obj) {
  let swells = obj;
  let result = swells.filter(el => el.height > 0);
  const finalResult = result.map(el => {
    const obj = { ...el };
    obj.direction = wind(el);
    return obj;
  });
  return finalResult;
}

function waveForecast(obj) {
  let hourForecast = obj.slice(0, 24);
  let time = hourForecast.map(el => {
    return el.timestamp;
  });
  let max = hourForecast.map(el => {
    return el.surf.max;
  });
  let min = hourForecast.map(el => {
    return el.surf.min;
  });
  return [time, max, min];
}

function convertTS(arr) {
  let theDate, dateString;
  let result = [];
  arr.forEach(el => {
    theDate = new Date(el * 1000);
    dateString = theDate.toUTCString().slice(-12, -7);
    result.push(dateString);
  });
  return result;
}

module.exports = {
  wind,
  convertTSprevious,
  previousTide,
  convertTSnext,
  nextTide,
  wave,
  weatherIcon,
  coordinates,
  ability,
  boardType,
  swell,
  waveForecast,
  convertTS
};
