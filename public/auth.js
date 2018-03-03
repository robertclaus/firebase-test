initApp = function() {
	// Handles the authorization event.
	firebase.auth().onAuthStateChanged(function(user) {
	  if (user) {
		user.getIdToken().then(function(accessToken) {
			login(user, accessToken);
		});
	  } else {
			logout();
	  }
	}, function(error) {
	  console.log(error);
	});
	
	var uiConfig = {
		// Override requirement for a redirect.  Actual callback is handled in onAuthStateChanged
		callbacks: { 'signInSuccess': function(currentUser, credential, redirectUrl) { return false; }}, // no redirect
		signInOptions: [
		  // Leave the lines as is for the providers you want to offer your users.
		  firebase.auth.GoogleAuthProvider.PROVIDER_ID,
		],
		// Terms of service url.
		tosUrl: url_termsandconditionspage,
	};
	
	// Initialize the FirebaseUI Widget using Firebase.
	var ui = new firebaseui.auth.AuthUI(firebase.auth());
	// The start method will wait until the DOM is loaded.
	ui.start('#firebaseui-auth-container', uiConfig);
	
	
	// Listen on the sign out button.
	document.getElementById(id_signinoutbutton).addEventListener('click', function() {
		firebase.auth().signOut();
		ui.start(selector_firebaseuiauthcontainer, uiConfig);
	});
};

window.addEventListener('load', function() {
	initApp()
});