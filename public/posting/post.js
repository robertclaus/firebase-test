window.addEventListener('load', function() {
	var listwrapper = document.getElementById("posting-list");
	initCollectionList(listwrapper,"posting",["title","description"], function(newElement, doc){
		console.log(doc);
		//Will initialize each response section here!
	});
});