login = function(user, accessToken) {
	// User is signed in.
	var displayName = user.displayName;
	var email = user.email;
	var emailVerified = user.emailVerified;
	var photoURL = user.photoURL;
	var uid = user.uid;
	var phoneNumber = user.phoneNumber;
	var providerData = user.providerData;
	console.log(accessToken);
	document.getElementById(id_accountcontainer).classList.remove(css_hiddenclass);
}

logout = function() {
	// User is signed out.
	document.getElementById(id_accountcontainer).classList.add(css_hiddenclass);
}