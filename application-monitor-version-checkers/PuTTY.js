const axios = require("axios");
const cheerio = require("cheerio");

module.exports = new Promise(function(resolve, reject) {
  axios
    .get("https://www.chiark.greenend.org.uk/~sgtatham/putty/latest.html")
    .then(function(response) {
      let data = cheerio.load(response.data);
      let value = data("h1").html();

      // Get Windows and macOS version
      let firstSplit = value.split("latest release (");
      let secondSplit = firstSplit[1].split(")");
      let newWindowsVersion = secondSplit[0];

      var versions = {};
      versions["newMacVersion"] = "N/A";
      versions["newWindowsVersion"] = newWindowsVersion;

      resolve(versions);
    })
    .catch(function(error) {
      reject(error);
    });
});
