const axios = require("axios");
const cheerio = require("cheerio");

module.exports = new Promise(function(resolve, reject) {
  axios
    .get("https://en.wikipedia.org/wiki/Adobe_Shockwave_Player")
    .then(function(response) {
      let data = cheerio.load(response.data);
      let value = data("table.infobox.vevent").html();

      let firstSplit = value.split("Stable release");
      let secondSplit = firstSplit[1].split(" (Win)");

      // Get macOS version
      let macSplit = secondSplit[1].split(" ");
      let newMacVersion = macSplit[1];

      // Get Windows version
      let windowsSplit = secondSplit[0].split('">');
      let newWindowsVersion = windowsSplit[1];

      var versions = {};
      versions["newMacVersion"] = newMacVersion;
      versions["newWindowsVersion"] = newWindowsVersion;

      resolve(versions);
    })
    .catch(function(error) {
      reject(error);
    });
});
