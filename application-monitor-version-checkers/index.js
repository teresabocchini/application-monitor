const check7Zip = require("./7-zip.js");
const checkAdobeDigitalEditions = require("./Adobe Digital Editions.js");
const checkAdobeFlash = require("./Adobe Flash.js");
const checkAdobeReader = require("./Adobe Reader.js");
const checkAdobeShockwave = require("./Adobe Shockwave.js");
const checkAudacity = require("./Audacity.js");
const checkCitrixWorkspaceApp = require("./Citrix Workspace App.js");
const checkGIMP = require("./GIMP.js");
const checkGoogleChrome = require("./Google Chrome.js");
const checkiTunes = require("./iTunes.js");
const checkJava = require("./Java.js");
const checkMozillaFirefox = require("./Mozilla Firefox.js");
const checkMozillaFirefoxESR = require("./Mozilla Firefox ESR.js");
const checkNETFramework = require("./NET Framework.js");
const checkNotepadPP = require("./Notepad++.js");
const checkPuTTY = require("./PuTTY.js");
const checkSkype = require("./Skype.js");
const checkVisualCPP = require("./Visual C++.js");
const checkVLCMediaPlayer = require("./VLC Media Player.js");

// Initialize Firebase
const firebase = require("firebase");
var config = {
  apiKey: "apiKey",
  authDomain: "authDomain",
  databaseURL: "databaseURL",
  projectId: "projectID",
  storageBucket: "storageBucket",
  messagingSenderId: "messagingSenderId"
};

const updateCheck = async function(
  firebase,
  applicationName,
  applicationId,
  newVersionPromise
) {
  const oldVersionPromise = new Promise(function(resolve, reject) {
    firebase
      .database()
      .ref()
      .child(`/ApplicationList/${applicationId}`)
      .once("value")
      .then(function(snapshot) {
        var versions = {};
        versions["oldMacVersion"] = snapshot.val().lastMacVersion;
        versions["oldWindowsVersion"] = snapshot.val().lastWindowsVersion;
        resolve(versions);
      })
      .catch(function(error) {
        reject(error);
      });
  });

  try {
    const oldVersions = await oldVersionPromise;
    const newVersions = await newVersionPromise;
    var results = {};

    if (
      hasNewVersion(oldVersions["oldMacVersion"], newVersions["newMacVersion"])
    ) {
      const result = await updateVersion(
        firebase,
        applicationId,
        applicationName,
        "Mac",
        newVersions["newMacVersion"]
      );
      results["mac"] = result;
    } else {
      results["mac"] = `${applicationName} has no new Mac version`;
    }

    if (
      hasNewVersion(
        oldVersions["oldWindowsVersion"],
        newVersions["newWindowsVersion"]
      )
    ) {
      const result = await updateVersion(
        firebase,
        applicationId,
        applicationName,
        "Windows",
        newVersions["newWindowsVersion"]
      );
      results["windows"] = result;
    } else {
      results["windows"] = `${applicationName} has no new Windows version`;
    }

    return results;
  } catch (error) {
    return error;
  }
};

const updateVersion = async function(
  firebase,
  applicationId,
  applicationName,
  platform,
  version
) {
  var update = {};
  update[`/ApplicationList/${applicationId}/last${platform}Version`] = version;
  update[`/ApplicationList/${applicationId}/new${platform}Version`] = true;

  try {
    await firebase
      .database()
      .ref()
      .update(update);

    return `New ${applicationName} version: ${version}`;
  } catch (error) {
    console.log(`Something went wrong with ${applicationName}: ${error}`);
    return error;
  }
};

const hasNewVersion = function(oldVersion, newVersion) {
  return newVersion != oldVersion;
};

firebase.initializeApp(config);

const allChecks = [
  updateCheck(firebase, "7-Zip", 1, check7Zip),
  updateCheck(firebase, "Adobe Digital Editions", 2, checkAdobeDigitalEditions),
  updateCheck(firebase, "Adobe Flash", 3, checkAdobeFlash),
  updateCheck(firebase, "Adobe Reader", 4, checkAdobeReader),
  updateCheck(firebase, "Adobe Shockwave", 5, checkAdobeShockwave),
  updateCheck(firebase, "Audacity", 6, checkAudacity),
  updateCheck(firebase, "GIMP", 7, checkGIMP),
  updateCheck(firebase, "Google Chrome", 8, checkGoogleChrome),
  updateCheck(firebase, "iTunes", 9, checkiTunes),
  updateCheck(firebase, "Java", 10, checkJava),
  updateCheck(firebase, "Citrix Workspace App", 11, checkCitrixWorkspaceApp),
  updateCheck(firebase, "Mozilla Firefox", 12, checkMozillaFirefox),
  updateCheck(firebase, "Mozilla Firefox ESR", 13, checkMozillaFirefoxESR),
  updateCheck(firebase, "NET Framework", 14, checkNETFramework),
  updateCheck(firebase, "Notepad++", 15, checkNotepadPP),
  updateCheck(firebase, "Putty", 16, checkPuTTY),
  updateCheck(firebase, "Skype", 17, checkSkype),
  updateCheck(firebase, "Visual C++", 18, checkVisualCPP),
  updateCheck(firebase, "VLC Media Player", 19, checkVLCMediaPlayer)
];

Promise.all(allChecks)
  .then(function(allChecks) {
    allChecks.forEach(function(element) {
      console.log(element);
    });
    firebase.database().goOffline();
  })
  .catch(function(error) {
    console.log(`Something went wrong: ${error}`);
    firebase.database().goOffline();
  });
