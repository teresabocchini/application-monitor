const axios = require("axios");
const cheerio = require("cheerio");

module.exports = new Promise(function(resolve, reject) {
  axios
    .get("https://www.videolan.org/vlc/index.html")
    .then(function(response) {
      let data = cheerio.load(response.data);
      let value = data("div#downloadDetails").html();

      // Get Windows and macOS version
      let firstSplit = value.split("\n");
      let secondSplit = firstSplit[2].split(" "); //.split("</span>");
      let thirdSplit = secondSplit[12].split("<");
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
