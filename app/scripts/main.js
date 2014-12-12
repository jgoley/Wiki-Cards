/*
    ___        ________   ________     
   |\  \      |\   ____\ |\   __  \    
   \ \  \     \ \  \___| \ \  \|\  \   
 __ \ \  \     \ \  \  ___\ \  \\\  \  
|\  \\_\  \  ___\ \  \|\  \\ \  \\\  \ 
\ \________\|\__\\ \_______\\ \_______\
 \|________|\|__| \|_______| \|_______|

Wiki Cards

 */

var base_url = 'https://en.wikipedia.org/w/api.php?',
    type = '',
    wikiAPI_URL = buildLink(base_url);

$(function() {
    // Display initial card
    getData(wikiAPI_URL);

    //Listen for button click 
    $('.discard').on('click', startDisplay);

    //Listen for enter
    $(document).keyup(function(e) {
        if (e.keyCode === 13) {
            startDisplay();
        }
    });

    //Listen for change in search field - change button text
    $('.search').keyup(function() {
        if ($(this).val().trim().length > 0) {
			$('.card-qty').attr('disabled', false);
            changeText("Search");
        } else {
			$('.card-qty').attr('disabled', true);
            changeText("Redeal");
        }
    })
});


try {
	console.log('%c    ___        ________   ________ \n    |\\  \\      |\\   ____\\ |\\   __  \\ \n    \\ \\  \\     \\ \\  \\___| \\ \\  \\|\\  \\ \n  __ \\ \\  \\     \\ \\  \\  ___\\ \\  \\\\\\  \\ \n |\\  \\\\_\\  \\  ___\\ \\  \\|\\  \\\\ \\  \\\\\\  \\   \n \\ \\________\\|\\__\\\\ \\_______\\\\ \\_______\\ \n  \\|________|\\|__| \\|_______| \\|_______| \n\n %cLet me know if you have any questions. \n\n github: http://github.com/jgoley \n twitter: http://twitter.com/jgoley \n ', 'color:rgba(1, 164, 245, 1);', 'color:red;')
    } catch(e) {}
