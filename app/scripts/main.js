/*
    ___        ________   ________     
   |\  \      |\   ____\ |\   __  \    
   \ \  \     \ \  \___| \ \  \|\  \   
 __ \ \  \     \ \  \  ___\ \  \\\  \  
|\  \\_\  \  ___\ \  \|\  \\ \  \\\  \ 
\ \________\|\__\\ \_______\\ \_______\
 \|________|\|__| \|_______| \|_______|

 */

console.log("%cLet me know if you have any questions.", 'color:red;')

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
            changeText("Search");
        } else {
            changeText("Redeal");
        }
    })

});