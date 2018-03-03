initPostApp = function() {
	// Listen on the new post button.
	document.getElementById(id_postbutton).addEventListener('click', function() {
		// Add a new document in collection "cities"
		db.collection("postings").add({
		    name: "A first post!",
		    state: "CA",
		    country: "USA",
		})
		.then(function() {
		    console.log("Document successfully written!");
		})
		.catch(function(error) {
		    console.error("Error writing document: ", error);
		});
	});
	
	// Initialize Postings
	db.collection("postings").get().then(function(querySnapshot) {
		querySnapshot.forEach(function(doc) {
			addOrUpdatePost(doc);
			});
    })
    .catch(function(error) {
        console.log("Error getting documents: ", error);
    });
    
    // Listen for changes
    db.collection("postings")
    .onSnapshot(function(querySnapshot) {
        querySnapshot.forEach(function(doc) {
            addOrUpdatePost(doc);
        });
    });
};

addOrUpdatePost = function(doc) {
   // doc.data() is never undefined for query doc snapshots
   var posting = findElementWithChildValue("posting", "posting-id", doc.id);
	
	if(posting == null){
		var template = document.getElementById("example-posting");
	   posting = template.cloneNode(true);
	   posting.classList.remove(css_hiddenclass);
	   findChildWithClass(posting, "posting-id").innerHTML = doc.id;
	}
   
   findChildWithClass(posting, "posting-name").innerHTML = doc.data().name;
   
   document.getElementById("posting-container").appendChild(posting);
}

findChildWithClass = function(parentElement, className){
	for (var i = 0; i < parentElement.childNodes.length; i++) {
		 childNodeClassList = parentElement.childNodes[i].classList;
	    if (childNodeClassList != undefined && childNodeClassList.contains(className)) {
	      return parentElement.childNodes[i];
	    }
	}
	return null;
}

findElementWithChildValue = function(elementClass, childClass, id){
   existingElements = document.getElementsByClassName(elementClass);
   for(var i = 0; i < existingElements.length; i++) {
   	if(findChildWithClass(existingElements[i], childClass).innerHTML === id){
   		return existingElements[i];
   	}
   }
   return null;
}

window.addEventListener('load', function() {
	initPostApp()
});