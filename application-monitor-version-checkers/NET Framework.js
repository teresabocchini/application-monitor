const axios = require("axios");
const cheerio = require("cheerio");

module.exports = new Promise(function(resolve, reject) {
  axios
    .get("https://dotnet.microsoft.com/download/dotnet-framework-runtime")
    .then(function(response) {
      let data = cheerio.load(response.data);
      let value = data("div.container").html();

      // Get Windows version
      let firstSplit = value.split("<h1>Download .NET Framework ");
      let secondSplit = firstSplit[1].split("</h1>");
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
