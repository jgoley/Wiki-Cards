function buildLink(base_url, type, query){

	var opts,
		linkParams = '',
		base = ['format=json','action=query'];

	if(type == 'search'){
		opts = [
			'action=query',
			'list=search',
			'srsearch='+query
		];
	} else{
		opts = [
			'generator=random',
			'grnnamespace=0',
			'grnlimit=1',
			'prop=extracts',
			'exintro='
		];
	}

	opts = _.union(base, opts);
	console.log(opts);

	_.each(opts, function(opt){
		linkParams = linkParams+'&'+opt;
	});
	return base_url+linkParams;
}

// Get JSON with ajax request
function request(url){
	$('.current-wiki').addClass('loading');
	$('.intro').html('');
	$('.title').html('');
	$('.article-link').html('');
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
function getData(url, type) {
	console.log(url);
	request(url).done(function(data){
		if(type)
			displayData(data.query.search[0]);
		else
			displayData(data.query.pages[_.keys(data.query.pages)[0]]);
	});
}

// Updates DOM
function displayData(article){
	var snippet = article.extract || article.snippet
	$('.current-wiki').removeClass('loading');
	var title = article.title;
	var rotation = randomNum(-1,1);
	$('.current-wiki').css('transform', 'rotate('+rotation+'deg)');
	$('.title').html(title);
	$('.intro').html(getFirstP(snippet));
	$('.article-link').attr('href', articleLink(title)).html('w');
}

// Gets first paragraph from extract
function getFirstP(text){
	return text.split("</p>")[0]+"</p>";
}

function articleLink(title){
	title = title.replace(/\s/g, '_');
	return "http://en.wikipedia.org/wiki/"+title;
}

function randomNum(min, max){
    return ((Math.random() * max) + min) * (Math.random() < 0.5 ? -1 : 1);
}