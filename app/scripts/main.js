
function getData(){
	return $.ajax({ 
		url: 'https://en.wikipedia.org/w/api.php?format=json&action=query&generator=random&grnnamespace=0&grnlimit=1&prop=extracts&exintro=',
		type: 'GET',
		dataType: 'jsonp',
	});
}


getData().done(function(data){
	displayData(data.query.pages[_.keys(data.query.pages)[0]]);
});

function displayData(article){
	$('.title').html(article.title);
	$('.intro').html(getFirstP(article.extract));
}

function getFirstP(text){
	return text.split("</p>")[0]+"</p>";
}