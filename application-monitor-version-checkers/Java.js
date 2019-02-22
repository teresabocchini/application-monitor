const axios = require("axios");
const cheerio = require("cheerio");

module.exports = new Promise(function(resolve, reject) {
  axios
    .get("https://www.java.com/en/download/")
    .then(function(response) {
      let data = cheerio.load(response.data);
      let value = data("h4.sub").html();

      // Get Windows and macOS version
      let firstSplit = value.split("Version ");
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
