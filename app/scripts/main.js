/*
    ___        ________   ________     
   |\  \      |\   ____\ |\   __  \    
   \ \  \     \ \  \___| \ \  \|\  \   
 __ \ \  \     \ \  \  ___\ \  \\\  \  
|\  \\_\  \  ___\ \  \|\  \\ \  \\\  \ 
\ \________\|\__\\ \_______\\ \_______\
 \|________|\|__| \|_______| \|_______|

 */

var base_url = 'https://en.wikipedia.org/w/api.php?';

$(function(){

	var type = '';
	var wikiAPI_URL = buildLink(base_url);
	getData(wikiAPI_URL);

	$('.discard').on('click', function(){
		var query = $('.search').val().trim();
		console.log(query);
		if(query.length > 0){
			type='search';
			wikiAPI_URL = buildLink(base_url, type, query);
		} else{
			type='';
			wikiAPI_URL = buildLink(base_url);
		}
		getData(wikiAPI_URL, type);
	});
});