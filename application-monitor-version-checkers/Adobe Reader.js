const axios = require("axios");
const cheerio = require("cheerio");

module.exports = new Promise(function(resolve, reject) {
  axios
    .get(
      "https://helpx.adobe.com/acrobat/release-note/release-notes-acrobat-reader.html"
    )
    .then(function(response) {
      let data = cheerio.load(response.data);
      let value = data("DIV .table.parbase.section").html();

      // Get Windows and macOS versions
      let firstSplit = value.split("</tr>");
      let secondSplit = firstSplit[1].split('blank">');
      let thirdSplit = secondSplit[1].split(" (");
      let fourthSplit = thirdSplit[1].split(")");
      let newVersion = fourthSplit[0];

      var versions = {};
      versions["newMacVersion"] = newVersion;
      versions["newWindowsVersion"] = newVersion;

      resolve(versions);
    })
    .catch(function(error) {
      reject(error);
    });
});
