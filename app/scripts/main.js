/*
    ___        ________   ________     
   |\  \      |\   ____\ |\   __  \    
   \ \  \     \ \  \___| \ \  \|\  \   
 __ \ \  \     \ \  \  ___\ \  \\\  \  
|\  \\_\  \  ___\ \  \|\  \\ \  \\\  \ 
\ \________\|\__\\ \_______\\ \_______\
 \|________|\|__| \|_______| \|_______|

 */

var wikiURL = 'https://en.wikipedia.org/w/api.php?format=json&action=query&generator=random&grnnamespace=0&grnlimit=1&prop=extracts&exintro=';

// Get JSON with ajax request
function request(){
	return $.ajax({ 
		url: wikiURL,
		type: 'GET',
		dataType: 'jsonp',
	});
}

/* -------------------------------------------------------------
Make request and when done call function to display data 
Uses underscore to get the first random object because the data 
modeling is not great. Ideally the 'pages' object should be an array. 
------------------------------------------------------------- */
function getData() {
	request().done(function(data){
		displayData(data.query.pages[_.keys(data.query.pages)[0]]);
	});
}

// Adds data/Updates DOM
function displayData(article){
	$('.title').html(article.title);
	$('.intro').html(getFirstP(article.extract));
}

// Gets first paragraph from extract
function getFirstP(text){
	return text.split("</p>")[0]+"</p>";
}

getData();

$(function(){
	$('.get-another').on('click', function(){
		getData();
	});
});