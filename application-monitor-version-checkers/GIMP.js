const axios = require("axios");
const cheerio = require("cheerio");

module.exports = new Promise(function(resolve, reject) {
  axios
    .get("https://www.gimp.org/downloads/")
    .then(function(response) {
      let data = cheerio.load(response.data);

      // Get Mac Version
      let macValue = data("div#mac.os.mac").html();
      let firstMacSplit = macValue.split("Download GIMP&#xA0;");
      let secondMacSplit = firstMacSplit[1].split("<br>");
      let newMacVersion = secondMacSplit[0];

      // Get Windows Version
      let winValue = data("div#win.os.win").html();
      let firstWinSplit = winValue.split("Download GIMP&#xA0;");
      let secondWinSplit = firstWinSplit[1].split("<br>");
      let newWindowsVersion = secondWinSplit[0];

      var versions = {};
      versions["newMacVersion"] = newMacVersion;
      versions["newWindowsVersion"] = newWindowsVersion;

      resolve(versions);
    })
    .catch(function(error) {});
});
