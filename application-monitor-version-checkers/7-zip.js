const axios = require("axios");
const cheerio = require("cheerio");

module.exports = new Promise(function(resolve, reject) {
  axios
    .get("https://www.7-zip.org/download.html")
    .then(function(response) {
      let data = cheerio.load(response.data);
      let value = data("body").html();

      // Get Windows version
      const strArray = value.split("Download 7-Zip ");
      const firstSplit = strArray[1].split(" ");
      const newWindowsVersion = firstSplit[0];

      var versions = {};
      versions["newMacVersion"] = "N/A";
      versions["newWindowsVersion"] = newWindowsVersion;

      resolve(versions);
    })
    .catch(function(error) {
      reject(error);
    });
});
