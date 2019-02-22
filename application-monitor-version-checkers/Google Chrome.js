const axios = require("axios");
const cheerio = require("cheerio");

module.exports = new Promise(function(resolve, reject) {
  axios
    .get("https://en.wikipedia.org/wiki/Google_Chrome")
    .then(function(response) {
      let data = cheerio.load(response.data);

      // Get Windows and macOS version
      let value = data("table.infobox.vevent").html();
      let firstSplit = value.split("Windows, macOS, Linux</th><td>");
      let secondSplit = firstSplit[1].split(" ");
      let newVersion = secondSplit[0];

      var versions = {};
      versions["newMacVersion"] = newVersion;
      versions["newWindowsVersion"] = newVersion;

      resolve(versions);
    })
    .catch(function(error) {
      reject(error);
    });
});
