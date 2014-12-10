function buildLink(base_url, opts){
	var linkParams; 
	_.each(opts, function(opt){
		linkParams = linkParams+'&'+opt;
	});
	return base_url+linkParams;
}

// Get JSON with ajax request
function request(url){
	return $.ajax({ 
		url: url,
		type: 'GET',
		dataType: 'jsonp',
	});
}

/* -------------------------------------------------------------
Make request and when done call function to display data.
Uses underscore to get the first random object because the data 
modeling is not great. Ideally the 'pages' object should be an array. 
------------------------------------------------------------- */
function getData(url) {
	request(url).done(function(data){
		displayData(data.query.pages[_.keys(data.query.pages)[0]]);
	});
}

// Adds data/Updates DOM
function displayData(article){
	var title = article.title;
	$('.title').html(title);
	$('.intro').html(getFirstP(article.extract));
	$('.article-link').attr('href', articleLink(title))
}

// Gets first paragraph from extract
function getFirstP(text){
	return text.split("</p>")[0]+"</p>";
}

function articleLink(title){
	title = title.replace(/\s/g, '_');
	return "http://en.wikipedia.org/wiki/"+title;
}