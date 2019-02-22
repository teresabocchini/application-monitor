const axios = require("axios");
const cheerio = require("cheerio");

module.exports = new Promise(function(resolve, reject) {
  axios
    .get("https://en.wikipedia.org/wiki/Adobe_Flash_Player")
    .then(function(response) {
      let data = cheerio.load(response.data);
      let value = data("table.infobox.vevent").html();

      // Get Windows and macOS versions
      let firstSplit = value.split("Windows, macOS, Linux, Chrome OS");
      let secondSplit = firstSplit[1].split("<td>");
      let thirdSplit = secondSplit[1].split("<");
      let newVersion = thirdSplit[0];

      var versions = {};
      versions["newMacVersion"] = newVersion;
      versions["newWindowsVersion"] = newVersion;

      resolve(versions);
    })
    .catch(function(error) {
      reject(error);
    });
});
