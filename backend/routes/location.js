const nodeGeocoder = require("node-geocoder");
const parseKML = require("parse-kml");

// constants
const OPENSTREETMAP = "openstreetmap";
const POINT = "Point";
const POLYGON = "Polygon";
const INVLAID_PARAMS = "Please send locaiton name";
const NOT_FOUND = "Not Found";

const getLocation = async (req, res) => {
  try {
    if (!req.query.location_name) {
      return res.send({ data: null, message: INVLAID_PARAMS });
    }
    const req_location = req.query.location_name;

    const { features } = await parseKML.toJson("public/delivery_locations.kml");

    const options = {
      provider: OPENSTREETMAP,
    };
    const geoCoder = nodeGeocoder(options);
    const response = await geoCoder.geocode(req_location);

    let return_obj = {};

    if (!response || !response.length) {
      return_obj.name = NOT_FOUND;
      return res.send({ data: return_obj });
    }

    for (let i = 0; i < features.length; i++) {
      if (features[i].geometry.type === POINT) {
        if (
          response.latitude === features[i].geometry.coordinates[1] &&
          response.longitude === features[i].geometry.coordinates[0]
        ) {
          return_obj.name = features[i].properties.name;
          break;
        }
      }
      if (features[i].geometry.type === POLYGON) {
        for (let j = 0; j < response.length; j++) {
          // considering 0 elevation
          if (
            insidePoly(
              [response[j].longitude, response[j].latitude, 0],
              features[i].geometry.coordinates.flat()
            )
          ) {
            return_obj.name = features[i].properties.name;
            break;
          } else {
            return_obj.name = NOT_FOUND;
          }
        }
      }

      if (return_obj.name && return_obj.name !== NOT_FOUND) {
        break;
      }
    }

    return res.send({ data: return_obj });
  } catch (err) {
    return res.send({ message: err.message });
  }
};

// considering the point is inside the polygon and not on edge or boundary
function insidePoly(point, vs) {
  var x = point[0],
    y = point[1];

  var inside = false;
  for (var i = 0, j = vs.length - 1; i < vs.length; j = i++) {
    var xi = vs[i][0],
      yi = vs[i][1],
      zi = vs[i][2];
    var xj = vs[j][0],
      yj = vs[j][1],
      zj = vs[j][2];

    var intersect =
      yi > y != yj > y && x < ((xj - xi) * (y - yi)) / (yj - yi) + xi;
    if (intersect) inside = !inside;
  }

  return inside;
}

module.exports = {
  getLocation,
};
