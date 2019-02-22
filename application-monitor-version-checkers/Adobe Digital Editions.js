const axios = require("axios");
const cheerio = require("cheerio");

module.exports = new Promise(function(resolve, reject) {
  axios
    .get("https://www.adobe.com/solutions/ebook/digital-editions/download.html")
    .then(function(response) {
      let data = cheerio.load(response.data);
      let value = data("div.grid-cols-12").html();

      // Get macOS version
      let firstMacSplit = value.split(" Macintosh"); //.split("</span>");
      let secondMacSplit = firstMacSplit[0].split('.dmg">');
      let newMacVersion = secondMacSplit[1];

      // Get Windows version
      let firstWindowsSplit = value.split(" Windows");
      let secondWindowsSplit = firstWindowsSplit[0].split('.exe">');
      let newWindowsVersion = secondWindowsSplit[1];

      var versions = {};
      versions["newMacVersion"] = newMacVersion;
      versions["newWindowsVersion"] = newWindowsVersion;

      resolve(versions);
    })
    .catch(function(error) {});
});
