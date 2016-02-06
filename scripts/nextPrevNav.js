/************************************************/
/* Simple Next / Previous button navigation		*/
/* Developed By:    Shannon DuBey				*/
/* version:         1.5							*/
/* release date:    01/16						*/
/************************************************/

var currentPageNum, nextPageNum, prevPageNum;
var getCurrentPage = function(){
	var location = window.location.pathname;
	if(location.toLowerCase().indexOf("landingpage.html") >=0) {
		currentPageNum = 1;
	} else if(location.toLowerCase().indexOf("lastpage.html") >=0) {
		currentPageNum = 99;
	} else {
		currentPageNum = location.match(/\d+/g)[0]; /* this assumes that the path to the file page*.html has no other digits and is the first int he array - adjust accordingly */
	} 
	return currentPageNum;
}

var getNextPageNum = function() {
	if (currentPageNum == 5) { /* needs to be set to the last page for each edition */
		nextPageNum = 99; /* this sets the next page button for the last matching page**.html to load lastPage.html */
	} else {
		nextPageNum = ++currentPageNum;
	}
	return nextPageNum;
};

var getPrevPageNum = function() {
	if(currentPageNum == 99) { /* this sets the Prev page button for lastPage.html to load the last page**.html */
		prevPageNum = 5; /* needs to be set to the last page for each edition */
	} else {
		prevPageNum = --currentPageNum;
	}
	return prevPageNum;
};

$(document).ready(function(){
	getCurrentPage();
// Next & Prev button click listeners
	$('a.nextBtn').click(function(currentPageNum) {
		getNextPageNum();
		if(nextPageNum == 99) { 
			window.open(['lastPage.html'],"_self");
		} else if (nextPageNum == 100) {
			window.open(['landingPage.html'],"_self"); 
		} else {
			window.open(['page' + nextPageNum + '.html'],"_self");
		}
	});

	$('a.prevBtn').click(function(currentPageNum) {
		getPrevPageNum();
		if (prevPageNum == 1) {
			window.open(['landingPage.html'],"_self");
		} else {
			window.open(['page' + prevPageNum + '.html'],"_self");
		}
	});
	
	/* prevent script storage in the browser back/forward cache */
	window.onunload = function(){}; 
});