function buildLink(t,e,n){var r,a="",i=$(".card-qty").val()||1,l=["format=json","action=query"];return r="search"===e?["list=search","srsearch="+n,"srlimit="+i]:["generator=random","grnnamespace=0","grnlimit=1","prop=extracts","exintro="],r=_.union(l,r),_.each(r,function(t){a=a+"&"+t}),t+a}function startDisplay(){var t=$(".search").val().trim(),e="";t.length>0?(type="search",e=buildLink(base_url,type,t)):(type="",e=buildLink(base_url)),getData(e,type)}function request(t){return $(".current-wiki").addClass("loading"),$(".intro").html(""),$(".title").html(""),$(".article-link").html(""),$.ajax({url:t,type:"GET",dataType:"jsonp"})}function getData(t,e){request(t).done(function(t){e?displayMultiple(t.query.search):displayOne(t.query.pages[_.keys(t.query.pages)[0]])})}function displayOne(t){$(".cards-wrap").html($("#one-card").html()),buildCard(t)}function displayMultiple(t){return $(".cards-wrap").empty(),0===t.length?void showNoCard():void _.each(t,function(t){var e={};e.title=t.title,e.snippet=getFirstP(t.snippet),e.link=articleLink(t.title),e.rotation=randomNum(-1,1);var n=_.template($("#cards").html());$(".cards-wrap").append(n(e))})}function buildCard(t){var e=t.extract||t.snippet;$(".current-wiki").removeClass("loading");var n=t.title,r=randomNum(-1,1);$(".current-wiki").css("transform","rotate("+r+"deg)"),$(".title").html(n),$(".intro").html(getFirstP(e)),$(".article-link").attr("href",articleLink(n)).html("w")}function showNoCard(){$(".cards-wrap").html($("#nothing").html())}function getFirstP(t){return t.split("</p>")[0]+"</p>"}function articleLink(t){return t=t.replace(/\s/g,"_"),"http://en.wikipedia.org/wiki/"+t}function randomNum(t,e){return(Math.random()*e+t)*(Math.random()<.5?-1:1)}function changeText(t){$(".button-text").html(t)}var base_url="https://en.wikipedia.org/w/api.php?",type="",wikiAPI_URL=buildLink(base_url);$(function(){getData(wikiAPI_URL),$(".discard").on("click",startDisplay),$(document).keyup(function(t){13===t.keyCode&&startDisplay()}),$(".search").keyup(function(){$(this).val().trim().length>0?($(".card-qty").attr("disabled",!1),changeText("Search")):($(".card-qty").attr("disabled",!0),changeText("Redeal"))})});try{console.log("%c    ___        ________   ________ \n    |\\  \\      |\\   ____\\ |\\   __  \\ \n    \\ \\  \\     \\ \\  \\___| \\ \\  \\|\\  \\ \n  __ \\ \\  \\     \\ \\  \\  ___\\ \\  \\\\\\  \\ \n |\\  \\\\_\\  \\  ___\\ \\  \\|\\  \\\\ \\  \\\\\\  \\   \n \\ \\________\\|\\__\\\\ \\_______\\\\ \\_______\\ \n  \\|________|\\|__| \\|_______| \\|_______| \n\n %cLet me know if you have any questions. \n\n github: http://github.com/jgoley \n twitter: http://twitter.com/jgoley \n ","color:rgba(1, 164, 245, 1);","color:red;")}catch(e){}