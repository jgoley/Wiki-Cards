
function getData(){
	return $.ajax({ 
		url: 'https://en.wikipedia.org/w/api.php?format=json&action=query&generator=random&grnnamespace=0&grnlimit=1&prop=extracts&exintro=',
		type: 'GET',
		dataType: 'jsonp',
	});
}


getData().done(function(data){
	displayData(data);
});

function displayData(data){
	var article = data.query.pages[_.keys(data.query.pages)];
}
