const express = require("express");
const app = express();
const firebase = require("firebase");

// Initialize Firebase
var config = {
  apiKey: "apiKey",
  authDomain: "authDomain",
  databaseURL: "databaseURL",
  projectId: "projectID",
  storageBucket: "storageBucket",
  messagingSenderId: "messagingSenderId"
};
firebase.initializeApp(config);

app.get("/api/applications", (req, res) => {
  firebase
    .database()
    .ref()
    .child("/ApplicationList")
    .once("value")
    .then(function(snapshot) {
      res.send(snapshot.val());
    });
});

app.get("/api/applications/:id", (req, res) => {
  firebase
    .database()
    .ref()
    .child(`/ApplicationList/${req.params.id}`)
    .once("value")
    .then(function(snapshot) {
      res.send(snapshot.val());
    });
});

// PORT
const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Listening on port ${port}...`));
