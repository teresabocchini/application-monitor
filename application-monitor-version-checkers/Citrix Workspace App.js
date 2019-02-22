const axios = require("axios");
const cheerio = require("cheerio");

module.exports = new Promise(function(resolve, reject) {
  axios
    .get("https://www.citrix.com/downloads/workspace-app/")
    .then(function(response) {
      let data = cheerio.load(response.data);
      let value = data("div.downloadComponent").html();

      // Get Windows version
      let firstMacSplit = value.split(" for Mac");
      let secondMacSplit = firstMacSplit[2].split("Citrix Workspace app ");
      let newMacVersion = secondMacSplit[1];

      // Get Windows version
      let firstWindowsSplit = value.split(" for Windows");
      let secondWindowsSplit = firstWindowsSplit[2].split(
        "Citrix Workspace app "
      );
      let newWindowsVersion = secondWindowsSplit[1];

      var versions = {};
      versions["newMacVersion"] = newMacVersion;
      versions["newWindowsVersion"] = newWindowsVersion;

      resolve(versions);
    })
    .catch(function(error) {
      reject(error);
    });
});
