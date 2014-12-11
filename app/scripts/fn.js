// var dummy = {"warnings":{"main":{"*":"Unrecognized parameter: 'undefined'"},"query":{"*":"Formatting of continuation data will be changing soon. To continue using the current formatting, use the 'rawcontinue' parameter. To begin using the new format, pass an empty string for 'continue' in the initial query."}},"query":{"pages":{"26696317":{"pageid":26696317,"ns":0,"title":"Cover meter","extract":"<p>A <b>cover meter</b> is an instrument to locate rebars and measure the exact concrete cover. Rebar detectors are less sophisticated devices that can only locate metallic objects below the surface. Due to the cost-effective design, the pulse-induction method is one of the most commonly used solutions.</p>\n<p></p>\n"}}}}

function buildLink(base_url, opts){
	var linkParams; 
	_.each(opts, function(opt){
		linkParams = linkParams+'&'+opt;
	});
	return base_url+linkParams;
}

// Get JSON with ajax request
function request(url){
	$('.intro').html('').addClass('loading');
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
function getData(url) {
	request(url).done(function(data){
		displayData(data.query.pages[_.keys(data.query.pages)[0]]);
	});
	// displayData(dummy.query.pages[_.keys(dummy.query.pages)[0]]);

}

// Updates DOM
function displayData(article){
	$('.intro').removeClass('loading');
	var title = article.title;
	var rotation = randomNum(-.5,.5);
	$('.current-wiki').css('transform', 'rotate('+rotation+'deg)');
	$('.title').html(title);
	$('.intro').html(getFirstP(article.extract));
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