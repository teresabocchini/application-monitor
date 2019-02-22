const axios = require("axios");
const cheerio = require("cheerio");

module.exports = new Promise(function(resolve, reject) {
  axios
    .get("https://en.wikipedia.org/wiki/Skype")
    .then(function(response) {
      let data = cheerio.load(response.data);
      let value = data("table.infobox.vevent").html();

      // Get macOS version
      let firstMacSplit = value.split("macOS</a></th><td>");
      let secondMacSplit = firstMacSplit[1].split(" ");
      let newMacVersion = secondMacSplit[0];

      // Get Windows version
      let firstWindowsSplit = value.split("Windows</a>, desktop</th><td>");
      let secondWindowsSplit = firstWindowsSplit[1].split(" ");
      let newWindowsVersion = secondWindowsSplit[0];

      var versions = {};
      versions["newMacVersion"] = newMacVersion;
      versions["newWindowsVersion"] = newWindowsVersion;

      resolve(versions);
    })
    .catch(function(error) {
      reject(error);
    });
});
