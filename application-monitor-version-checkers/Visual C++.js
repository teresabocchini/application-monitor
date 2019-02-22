const axios = require("axios");
const cheerio = require("cheerio");

module.exports = new Promise(function(resolve, reject) {
  axios
    .get("https://visualstudio.microsoft.com/vs/")
    .then(function(response) {
      let data = cheerio.load(response.data);
      let value = data(
        "div.vscom-switchable.vscom-no-single-column.fusion-no-small-visibility"
      ).html();

      // Get macOS version
      let firstMacSplit = value.split("Download Visual Studio for Mac");
      let secondMacSplit = firstMacSplit[0].split(
        "Download Visual Studio Community "
      );
      let thirdMacSplit = secondMacSplit[1].split('">');
      let newMacVersion = thirdMacSplit[0];

      // Get Windows version
      let firstWindowsSplit = value.split("Download Visual Studio for Windows");
      let secondWindowsSplit = firstWindowsSplit[1].split(
        "Download Visual Studio Community "
      );
      let thirdWindowsSplit = secondWindowsSplit[1].split('">');
      let newWindowsVersion = thirdWindowsSplit[0];

      var versions = {};
      versions["newMacVersion"] = "N/A";
      versions["newWindowsVersion"] = newWindowsVersion;

      resolve(versions);
    })
    .catch(function(error) {
      reject(error);
    });
});
