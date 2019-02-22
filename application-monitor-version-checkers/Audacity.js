const axios = require("axios");
const cheerio = require("cheerio");

module.exports = new Promise(function(resolve, reject) {
  axios
    .get("https://www.audacityteam.org/")
    .then(function(response) {
      let data = cheerio.load(response.data);
      let value = data("div.site-content-action").html();

      // Get Windows and macOS versions
      let firstSplit = value.split("Latest version : ");
      let secondSplit = firstSplit[1].split("</span>");
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
