const axios = require("axios");
const cheerio = require("cheerio");

module.exports = new Promise(function(resolve, reject) {
  axios
    .get("https://en.wikipedia.org/wiki/ITunes")
    .then(function(response) {
      let data = cheerio.load(response.data);
      let value = data("table.infobox.vevent").html();

      // Get Windows and macOS version
      let firstSplit = value.split(
        'Stable release</a></th><td><div style="margin:0px;">'
      );
      let secondSplit = firstSplit[1].split("\n");
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
