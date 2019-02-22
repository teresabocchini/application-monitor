const axios = require("axios");
const cheerio = require("cheerio");

module.exports = new Promise(function(resolve, reject) {
  axios
    .get("https://www.mozilla.org/en-US/firefox/")
    .then(function(response) {
      let data = cheerio.load(response.data);
      let value = data.html();

      // Get Windows and macOS version
      let firstSplit = value.split('data-latest-firefox="');
      let secondSplit = firstSplit[1].split('"');
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
