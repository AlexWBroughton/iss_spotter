const request = require("request");

const fetchMyIP = function(callback) {
  request("https://api.ipify.org", (error, response, body) => {
    if (error) {
      callback(error, null);
      throw error;
    }
    if (response.statusCode !== 200) {
      const msg = `Status Code ${response.statusCode} when fetching IP. Response: ${body}`;
      callback(Error(msg), null);
      return;
    }
    const dataString = body;
    callback(null, dataString);
  });
};


//Grabs your coordinates based on your IP address.
const fetchCoordsByIP = function(IP, callback) {
  request("http://ipwho.is/" + IP, (error, response, body) => {
    if (error) {
      callback(error, null);
      throw error;
    }
    if (response.statusCode !== 200) {
      const msg = `Status Code ${response.statusCode} when fetching IP. Response: ${body}`;
      callback(Error(msg), null);
      return;
    }

    const parsedBody = JSON.parse(body);

    if (!parsedBody.success) {
      const message = `Success status was ${parsedBody.success}. Server message says: ${parsedBody.message} when fetching for IP ${parsedBody.ip}`;

      callback(Error(message), null);
      return;
    }
    const Coord = {
      latitude: parsedBody.latitude,
      longitude: parsedBody.longitude,
    };
    callback(null, Coord);
  });
};



/**
 * Makes a single API request to retrieve upcoming ISS fly over times the for the given lat/lng coordinates.
 * Input:
 *   - An object with keys `latitude` and `longitude`
 *   - A callback (to pass back an error or the array of resulting data)
 * Returns (via Callback):
 *   - An error, if any (nullable)
 *   - The fly over times as an array of objects (null if error). Example:
 *     [ { risetime: 134564234, duration: 600 }, ... ]
 */
const fetchISSFlyOverTimes = function(Coords, callback) {
  // ...

  request(`https://iss-flyover.herokuapp.com/json/?lat=${Coords.latitude}&lon=${Coords.longitude}`, (error, response, body) => {
    if (error) {
      callback(error, null);
      throw error;
    }
    if (response.statusCode !== 200) {
      const msg = `Status Code ${response.statusCode} when fetching IP. Response: ${body}`;
      callback(Error(msg), null);
      return;
    }
    const parsedBody = JSON.parse(body);
    const responseArray = parsedBody.response;
    callback(null,responseArray);
  });
};



// iss.js 

/**
 * Orchestrates multiple API requests in order to determine the next 5 upcoming ISS fly overs for the user's current location.
 * Input:
 *   - A callback with an error or results. 
 * Returns (via Callback):
 *   - An error, if any (nullable)
 *   - The fly-over times as an array (null if error):
 *     [ { risetime: <number>, duration: <number> }, ... ]
 */ 
const nextISSTimesForMyLocation = function(callback) {
  fetchMyIP((error, ip) => {
    if (error) {
      return callback(error, null);
    }

    fetchCoordsByIP(ip, (error, loc) => {
      if (error) {
        return callback(error, null);
      }

      fetchISSFlyOverTimes(loc, (error, nextPasses) => {
        if (error) {
          return callback(error, null);
        }

        callback(null, nextPasses);
      });
    });
  });
};


module.exports = {nextISSTimesForMyLocation};
