function buildLink(base_url, type, query) {

// prop=extracts&pilimit=max&&explaintext&exlimit=max

    var opts,
        linkParams = '',
        qty = $('.card-qty').val() || 1,
        base = ['format=json', 'action=query', 'prop=extracts', 'exintro' ];

    if (type === 'search') {
        opts = [
            'generator=search',
            'gsrsearch=' + query,
            'gsrlimit=' + qty,
            'explaintext',
            'exlimit=max',
        ];
    } else {
        opts = [
            'generator=random',
            'grnnamespace=0',
            'grnlimit=1',
        ];
    }

    opts = _.union(base, opts);
    _.each(opts, function(opt) {
        linkParams = linkParams + '&' + opt;
    });
    console.log(base_url + linkParams);
    return base_url + linkParams;
}

function startDisplay() {
    var query = $('.search').val().trim(),
        wikiAPI_URL = "";
    if (query.length > 0) {
        type = 'search';
        wikiAPI_URL = buildLink(base_url, type, query);
    } else {
        type = '';
        wikiAPI_URL = buildLink(base_url);
    }
    getData(wikiAPI_URL, type);
}

// Get JSON with ajax request
function request(url) {
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
    request(url).done(function(data) {
        if (type)
            displayMultiple(data.query.search);
        else
            displayOne(data.query.pages[_.keys(data.query.pages)[0]]);
    });
}

// Updates DOM
function displayOne(article) {
    $('.cards-wrap').html($('#one-card').html());
    buildCard(article);
}

function displayMultiple(articles) {
    $('.cards-wrap').empty();

    if (articles.length === 0) {
        showNoCard()
        return;
    }
    _.each(articles, function(article) {
        var data = {};
        data.title = article.title;
        data.snippet = getFirstP(article.extract);
        data.link = articleLink(article.title);
        data.rotation = randomNum(-1, 1);
        var template = _.template($('#cards').html());
        $('.cards-wrap').append(template(data));
    });
}

function buildCard(article, type) {
    var snippet = article.extract;
    $('.current-wiki').removeClass('loading');
    var title = article.title;
    var rotation = randomNum(-1, 1);
    $('.current-wiki').css('transform', 'rotate(' + rotation + 'deg)');
    $('.title').html(title);
    $('.intro').html(getFirstP(snippet));
    $('.article-link').attr('href', articleLink(title)).html('w');
}

function showNoCard() {
    $('.cards-wrap').html($('#nothing').html());
}

// Gets first paragraph from extract
function getFirstP(text) {
    return text.split("</p>")[0] + "</p>";
}

function articleLink(title) {
    title = title.replace(/\s/g, '_');
    return "http://en.wikipedia.org/wiki/" + title;
}

function randomNum(min, max) {
    return ((Math.random() * max) + min) * (Math.random() < 0.5 ? -1 : 1);
}

function changeText(w) {
    $('.button-text').html(w);
}