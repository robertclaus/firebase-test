// Initialize Firebase
var config = {
	apiKey: "AIzaSyDlgwOIQr_v5sw0BSVwQxZiKIN8j-6YcjU",
	authDomain: "staffer-88d4c.firebaseapp.com",
	databaseURL: "https://staffer-88d4c.firebaseio.com",
	projectId: "staffer-88d4c",
	storageBucket: "staffer-88d4c.appspot.com",
	//messagingSenderId: "369949174283"
};
console.log(firebase.apps);
var app = !firebase.apps.length ? firebase.initializeApp(config) : firebase.app();

var db2 = firebase.database();

var db = firebase.firestore();
/*
firebase.firestore().enablePersistence()
        .then(function() {
            // Initialize Cloud Firestore through firebase
            var db = firebase.firestore();
        })
        .catch(function(err) {
            if (err.code == 'failed-precondition') {
            	console.log("This only works in one tab at a time.");
                // Multiple tabs open, persistence can only be enabled
                // in one tab at a a time.
                // ...
            } else if (err.code == 'unimplemented') {
            	console.log("This browser is not supported.");
                // The current browser does not support all of the
                // features required to enable persistence
                // ...
            }
        });*/