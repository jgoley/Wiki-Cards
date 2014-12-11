/*
    ___        ________   ________     
   |\  \      |\   ____\ |\   __  \    
   \ \  \     \ \  \___| \ \  \|\  \   
 __ \ \  \     \ \  \  ___\ \  \\\  \  
|\  \\_\  \  ___\ \  \|\  \\ \  \\\  \ 
\ \________\|\__\\ \_______\\ \_______\
 \|________|\|__| \|_______| \|_______|

 */

(function(){

	'use strict';

	window.Wiki = window.Wiki || {};

	Wiki.Views = {};
	Wiki.Models = {};
	Wiki.Session = "";

	var options = [
			'format=json',
			'action=query',
			'generator=random',
			'grnnamespace=0',
			'grnlimit=1',
			'prop=extracts',
			'exintro='
		],
		base_url = 'https://en.wikipedia.org/w/api.php?';

		Wiki.wikiAPI_URL = buildLink(base_url, options);

})();

$(function(){

	Parse.initialize("LRiLzOIAqKwcBAKWZ4bw2SR347BfHOGug1wYX8qC", "UzEl4tlKGYmkKQgsQbA2SjWAbYr5jB1LW0wOfN9n");

    window.WikiApp = new Wiki.Router();
    Parse.history.start();

	getData(Wiki.wikiAPI_URL);

	$('.discard').on('click', function(){
		getData(wikiAPI_URL);
	});
});

