/*
    ___        ________   ________     
   |\  \      |\   ____\ |\   __  \    
   \ \  \     \ \  \___| \ \  \|\  \   
 __ \ \  \     \ \  \  ___\ \  \\\  \  
|\  \\_\  \  ___\ \  \|\  \\ \  \\\  \ 
\ \________\|\__\\ \_______\\ \_______\
 \|________|\|__| \|_______| \|_______|

 */

var options = [
	'format=json',
	'action=query',
	'generator=random',
	'grnnamespace=0',
	'grnlimit=1',
	'prop=extracts',
	'exintro='
],
	base_url = 'https://en.wikipedia.org/w/api.php?',
	wikiAPI_URL = buildLink(base_url, options);

getData(wikiAPI_URL);

$(function(){
	$('.get-another').on('click', function(){
		getData(wikiAPI_URL);
	});
});