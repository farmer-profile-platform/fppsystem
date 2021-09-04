var request = require('../../node_modules/request');

const API_KEY = "e1b9de980a1789795ec635bc73f35d78";
const WAPI_KEY = "48d2e3342544663f3f966ccb2bd91b5a";

const getimage = (start, end, polyid, callback) => {
  console.log('%c Fetching Satellite images...', 'color: blue; font-weight: bold;');
  var options = {
    'method': 'GET',
    'url': 'https://api.agromonitoring.com/agro/1.0/image/search?start=' + start + '&end=' + end + '&polyid=' + polyid + '&appid=' + API_KEY + '&resolution_min=1000px&resolution_max=3000px&coverage_max=100&coverage_min=80',
    'headers': {
    }
  };
  request(options, function (error, response) {
    if (error) throw new Error(error);
    console.log('%c Satellite Images fetched', 'color: blue; font-weight: bold;');
    var data = JSON.parse(response.body.toString());
    var satellite = data[0];
    return callback(satellite);
  });
}

const getweather = (lat, lon, callback) => {
  console.log('%c Getting weather data...', 'color: blue; font-weight: bold;');
  var options = {
    'method': 'GET',
    'url': 'https://api.openweathermap.org/data/2.5/weather?lat=' + lat + '&lon=' + lon + '&appid=' + WAPI_KEY,
    'headers': {
    }
  };
  request(options, function (error, response) {
    if (error) throw new Error(error);
    console.log('%c Weather data fetched', 'color: blue; font-weight: bold;');
    var data = JSON.parse(response.body.toString());
    return callback(data);
  });
}

const getpoly = (coordinates, farmer, polyid, callback) => {
  searchpolygon(farmer, function (data) {
    if (data !== null) {
      return callback(data);
    } else {
      console.log('%c Farmer polygon not found online', 'color: purple; font-weight: bold;');
      var options;
      if (polyid == null) {
        console.log('%c Creating new polygon...', 'color: purple; font-weight: bold;');
        options = {
          'method': 'POST',
          'url': 'https://api.agromonitoring.com/agro/1.0/polygons?appid=' + API_KEY,
          'headers': {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            "name": farmer,
            "geo_json": {
              "type": "Feature",
              "properties": {},
              "geometry": {
                "type": "Polygon",
                "coordinates": [
                  coordinates
                ]
              }
            }
          })
        };
      } else {
        console.log('%c Farmer has polygon already', 'color: purple; font-weight: bold;');
        console.log('%c Fetching polygon', 'color: purple; font-weight: bold;');
        options = {
          'method': 'GET',
          'url': 'https://api.agromonitoring.com/agro/1.0/polygons/' + polyid + '?appid=' + API_KEY,
          'headers': {
          }
        }
      }
      request(options, function (error, response) {
        if (error) throw new Error(error);
        if (polyid == null) { console.log('%c Polygon created', 'color: purple; font-weight: bold;'); }
        else { console.log('%c Polygon fetched', 'color: purple; font-weight: bold;'); }
        return callback(JSON.parse(response.body.toString()));
      });
    }
  });
}

const searchpolygon = (farmer, callback) => {
  console.log('%c Searching polygon...', 'color: gold; font-weight: bold;');
  var options = {
    'method': 'GET',
    'url': 'https://api.agromonitoring.com/agro/1.0/polygons?appid=' + API_KEY,
    'headers': {
    }
  };
  request(options, function (error, response) {
    if (error) throw new Error(error);
    var json = JSON.parse(response.body.toString());
    var results = null;
    var result = null;
    for (let i = 0; i < json.length; i++) {
      if (json[i].name == farmer) {
        results = json[i];
        break;
      }
    }
    var polydata = JSON.parse(JSON.stringify(results));
    if (polydata !== null) {
      result = JSON.parse(JSON.stringify({ "id": polydata.id }));
      console.log('%c Polygon found', 'color: gold; font-weight: bold;');
    } else { result = null; }
    return callback(result);
  });
}

const getFarmWeather = (coordinates, lat, lon, farmer, polyid, callback) => {
  console.log('%c Getting farm weather & satellite data...', 'color: green; font-weight: bold;');
  var poly = null;
  getpoly(coordinates, farmer, polyid, function (data) {
    poly = data;
    var start = "1581811200";//poly.created_at
    var end = Math.floor(Date.now() / 1000);
    getimage(start, end, poly.id, function (data) {
      var satellite = data;
      getweather(lat, lon, function (data) {
        var forcast = data;
        var weth = JSON.stringify(data.weather);
        var w = weth.substr(1, weth.length);
        var j = JSON.parse(w.substr(0, w.length - 1));
        console.log('%c Farm data weather & satellite retrieved', 'color: green; font-weight: bold;');
        return callback(
          {
            polygon: poly.id,
            truecolor: satellite.image.truecolor,
            falsecolor: satellite.image.falsecolor,
            ndvi: satellite.image.ndvi,
            evi: satellite.image.evi,
            evi2: satellite.image.evi2,
            weather: j.main,
            condition: j.description,
            icon: j.icon,
            humidity: forcast.main.humidity
          }
        );
      });
    })
  });
}

module.exports.getFarmWeather = getFarmWeather;
module.exports.getweather = getweather;