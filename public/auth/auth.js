initApp = function() {
	var displaying_auth_ui = false;
	
	var uiConfig = {
		// Override requirement for a redirect.  Actual callback is handled in onAuthStateChanged
		callbacks: { 'signInSuccess': function(currentUser, credential, redirectUrl) { return false; }}, // no redirect
		signInOptions: [
		  // Add any authorization providers here
		  firebase.auth.GoogleAuthProvider.PROVIDER_ID,
		],
		// Terms of service url.
		tosUrl: url_termsandconditionspage,
	};
	
	// Initialize the FirebaseUI Widget using Firebase.
	var ui = new firebaseui.auth.AuthUI(firebase.auth());
	// The start method will wait until the DOM is loaded.
	if (ui.isPendingRedirect() && !displaying_auth_ui) {
		ui.start(selector_firebaseuiauthcontainer, uiConfig);
		displaying_auth_ui = true;
	}
	
	
	// Handles the authorization event.
	firebase.auth().onAuthStateChanged(function(user) {
	  if (user) {
		user.getIdToken().then(function(accessToken) {
			login(user, accessToken);
			displaying_auth_ui = false;
		});
	  } else {
			logout();
			if (!ui.isPendingRedirect() && !displaying_auth_ui) {
				ui.start(selector_firebaseuiauthcontainer, uiConfig);
				displaying_auth_ui = true;
			}
	  }
	}, function(error) {
	  console.log(error);
	});
	
	
	// Listen on the sign out button.
	document.getElementById(id_signinoutbutton).addEventListener('click', function() {
		firebase.auth().signOut();
		ui.start(selector_firebaseuiauthcontainer, uiConfig);
	});
};

window.addEventListener('load', function() {
	initApp()
});