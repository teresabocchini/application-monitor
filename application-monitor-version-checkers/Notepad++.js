const axios = require("axios");
const cheerio = require("cheerio");

module.exports = new Promise(function(resolve, reject) {
  axios
    .get("https://notepad-plus-plus.org/")
    .then(function(response) {
      let data = cheerio.load(response.data);
      let value = data("p#download").html();

      // Get Windows and macOS version
      let firstSplit = value.split("Current Version: <span>");
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
