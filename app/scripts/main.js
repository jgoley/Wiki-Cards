/*
    ___        ________   ________     
   |\  \      |\   ____\ |\   __  \    
   \ \  \     \ \  \___| \ \  \|\  \   
 __ \ \  \     \ \  \  ___\ \  \\\  \  
|\  \\_\  \  ___\ \  \|\  \\ \  \\\  \ 
\ \________\|\__\\ \_______\\ \_______\
 \|________|\|__| \|_______| \|_______|

 */
console.log("%cLet me know if you have any questions. jgoley@gmail.com", 'color:red;')


var base_url = 'https://en.wikipedia.org/w/api.php?',
	type = '', // Random or query
	wikiAPI_URL = buildLink(base_url); //Build link for initial card

$(function(){
	// Display initial card
	getData(wikiAPI_URL);

	//Listen for button click 
	$('.discard').on('click', startDisplay());

	//Listen for enter
	$(document).keyup(function(e){
		if(e.keyCode == 13){
			startDisplay();			
		}
	});

});