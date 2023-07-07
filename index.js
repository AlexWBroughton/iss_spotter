
const {nextISSTimesForMyLocation} = require('./iss');


/*
fetchMyIP((error, IP) => {
  let globalIP = "";
  if (error) {
    console.log("Error fetch details:", error);
  } else {
    console.log(IP);
    globalIP = IP;
  }
  fetchCoordsByIP(globalIP, (error, Coord) => {
    let Coords = {};
    if (error) {
      console.log("Error fetch details:", error);
    } else {
      console.log(`Latitude:  ${Coord.latitude} Longitude: ${Coord.longitude}`);
      Coords = Coord;
    }
  
    fetchISSFlyOverTimes(Coords,(error, parsedBody) => {
      if (error) {
        console.log("Error fetch details:", error);
      } else {
        console.log(parsedBody);
      }
    });
  });
});
*/

nextISSTimesForMyLocation((error, passTimes) => {
  if (error) {
    return console.log("It didn't work!", error);
  }
  // success, print out the deets!
  console.log(passTimes);
});




