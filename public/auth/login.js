login = function(user, accessToken) {
	// User is signed in.
	var displayName = user.displayName;
	var email = user.email;
	var emailVerified = user.emailVerified;
	var photoURL = user.photoURL;
	var uid = user.uid;
	var phoneNumber = user.phoneNumber;
	var providerData = user.providerData;
	document.getElementById(id_loggedincontainer).classList.remove(css_hiddenclass);
	document.getElementById(id_username).innerHTML = user.displayName;
}

logout = function() {
	// User is signed out.
	document.getElementById(id_loggedincontainer).classList.add(css_hiddenclass);
}