meta_elementlist = ["createdByUserId"];


initCollectionList = function(listwrapper, collectionName, elementlist, onCreate) {
	var createForm = findChildWithClass(listwrapper,"create-form");
	var containerElement = findChildWithClass(listwrapper,"container");
	
	// Listen on the new post button.
	findChildWithClass(createForm, collectionName+"-create").addEventListener('click', function() {
		newDoc = {};
		for(var i = 0; i<elementlist.length; i++){
			newDoc[elementlist[i]] = findChildWithClass(createForm, collectionName+"-create-"+elementlist[i]).innerHTML;
		}
		
		//Populate meta-data
		newDoc["createdByUserId"]=user_id;
		
		db.collection(collectionName).add(newDoc)
		.then(function() {
		    console.log("Document successfully written!");
		})
		.catch(function(error) {
		    console.error("Error writing document: ", error);
		});
	});
	
	// Initialize Postings
	db.collection(collectionName).get().then(function(querySnapshot) {
		querySnapshot.forEach(function(doc) {
			addOrUpdateElement(containerElement, doc, collectionName, elementlist, onCreate);
			});
    })
    .catch(function(error) {
        console.log("Error getting documents: ", error);
    });
    
    // Listen for changes
    db.collection(collectionName)
    .onSnapshot(function(querySnapshot) {
        querySnapshot.forEach(function(doc) {
            addOrUpdateElement(containerElement, doc, collectionName, elementlist, onCreate);
        });
        querySnapshot.docChanges.forEach(function(change){
        		if(change.type === "removed"){
        			console.log("Deleted "+change.doc.id);
        			removeElement(containerElement, collectionName, collectionName+"-id", change.doc.id);
        		}
        });
    });
};

addOrUpdateElement = function(containerElement, doc, collectionName, elementlist, onCreate) {
   // doc.data() is never undefined for query doc snapshots
   var element = findElementWithChildValue(containerElement, collectionName, collectionName+"-id", doc.id);
	
	if(element == null){
		var template = findChildWithClass(containerElement, "example");
	   element = template.cloneNode(true);
	   element.classList.remove(css_hiddenclass);
	   findChildWithClass(element, collectionName+"-id").innerHTML = doc.id;
	   findChildWithClass(element, collectionName+"-delete").addEventListener('click', function(event) {
			db.collection(collectionName).doc(doc.id).delete().then().catch(function(error){
				alert("An error occured removing the element.");
			});
		});
		onCreate(element, doc);
	}
   
   for(var i = 0; i<elementlist.length; i++){
   	displayelement = findChildWithClass(element, collectionName+"-"+elementlist[i]);
   	if(displayelement != undefined){
   		displayelement.innerHTML = doc.data()[elementlist[i]];
   	}
   }
   for(var i = 0; i<meta_elementlist.length; i++){
      displayelement = findChildWithClass(element, collectionName+"-"+meta_elementlist[i]);
   	if(displayelement != undefined){
   		displayelement.innerHTML = doc.data()[meta_elementlist[i]];
   	}
   }
   
   containerElement.appendChild(element);
}

removeElement = function(containerElement, elementClass, childClass, value){
	var element = findElementWithChildValue(containerElement, elementClass, childClass, value);
	element.outerHTML="";
	delete element;
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

findElementWithChildValue = function(containerElement, elementClass, childClass, value){
   existingElements = containerElement.getElementsByClassName(elementClass);
   for(var i = 0; i < existingElements.length; i++) {
   	if(findChildWithClass(existingElements[i], childClass).innerHTML === value){
   		return existingElements[i];
   	}
   }
   return null;
}