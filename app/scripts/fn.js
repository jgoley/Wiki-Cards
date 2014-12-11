function buildLink(base_url, type, query){

	var opts,
		linkParams = '',
		base = ['format=json','action=query'];

	if(type === 'search'){
		opts = [
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
	_.each(opts, function(opt){
		linkParams = linkParams+'&'+opt;
	});
	return base_url+linkParams;
}

function startDisplay(){
	var query = $('.search').val().trim(),
		wikiAPI_URL = "";
	if(query.length > 0){
		type='search';
		wikiAPI_URL = buildLink(base_url, type, query);
	} else{
		type='';
		wikiAPI_URL = buildLink(base_url);
	}
	getData(wikiAPI_URL, type);
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

function getData(url, type) {
	request(url).done(function(data){
		if(type)
			displayData(data.query.search[0]);
		else
			displayData(data.query.pages[_.keys(data.query.pages)[0]]);
	});
}

// Updates DOM
function displayData(article){
	var snippet = article.extract || article.snippet;
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

function changeText(w){
	console.log("changing", w);
	$('.button-text').html(w);
}