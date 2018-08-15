var express = require('express');
var app = express();
var fs = require("fs");
var admin = require('firebase-admin');
var serviceAccount = require(__dirname + "/config/ServiceAccount.json");

app.get('/listUsers', function (req, res) {
  admin.auth().signInWithEmailAndPassword("email@rk.com", "password").catch(function(error) {
  // Handle Errors here.
  var errorCode = error.code;
  var errorMessage = error.message;
  console.log("logged in");
  // ...
});
})

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: 'https://api-demo-45354.firebaseio.com'
});

/*admin.auth().createUser({
  uid: "some-uid",
  email: "user@example.com",
  password: "secretPassword",
  phoneNumber: "+11234567890"
})
  .then(function(userRecord) {
    // See the UserRecord reference doc for the contents of userRecord.
    console.log("Successfully created new user:", userRecord.uid);
  })
  .catch(function(error) {
    console.log("Error creating new user:", error);
  });*/


admin.auth().createUserWithEmailAndPassword("email@rk.com", "password").catch(function(error) {
  // Handle Errors here.
  var errorCode = error.code;
  var errorMessage = error.message;

  console.log("created new");
  // ...
});

  function listAllUsers(nextPageToken) {
  // List batch of users, 1000 at a time.
  admin.auth().listUsers(1000, nextPageToken)
    .then(function(listUsersResult) {
      listUsersResult.users.forEach(function(userRecord) {
        console.log("user", userRecord.toJSON());
      });
      if (listUsersResult.pageToken) {
        // List next batch of users.
        listAllUsers(listUsersResult.pageToken)
      }
    })
    .catch(function(error) {
      console.log("Error listing users:", error);
    });
}
// Start listing users from the beginning, 1000 at a time.
listAllUsers();

var server = app.listen(8081, function () {

  var host = server.address().address
  var port = server.address().port

  console.log("Example app listening at http://%s:%s", host, port)

})
