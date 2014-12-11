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
	//displayData(dummy.query.pages[_.keys(dummy.query.pages)[0]]);

}

// Updates DOM
function displayData(article){
	var rotation = randomNum(-1, 1)
	var title = article.title;
	$('.current-wiki').css('transform', 'rotate('+rotation+'deg)');
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

function randomNum(min, max){
    return ((Math.random() * max) + min) * (Math.random() < 0.5 ? -1 : 1);
}

// Add listenTo method

var BaseView = function(options) {
    this.bindings = [];
    Parse.View.apply(this, [options]);
    Bees.viewIndex[this.cid] = this;
};
_.extend(BaseView.prototype, Parse.View.prototype, {
    listenTo: function(model, ev, callback) {
        model.bind(ev, callback, this);
        this.bindings.push({
            model: model,
            ev: ev,
            callback: callback
        });
    },
    stopListeningAll: function() {
        _.each(this.bindings, function(binding) {
            binding.model.unbind(binding.ev, binding.callback);
        });
        this.bindings = [];
    },
    dispose: function() {
        this.stopListeningAll();
        this.unbind();
        this.remove();
        _.invoke(this.subViews, 'dispose');
        delete Bees.viewIndex[this.cid];
    }
});
BaseView.extend = Parse.View.extend;
