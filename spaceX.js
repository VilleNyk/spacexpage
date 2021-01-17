"use strict";

// @author Ville Nykänen
$(document).ready(function(){
    var seuraava = "https://api.spacexdata.com/v3/launches/next";
    $.getJSON(seuraava, seuraavaLaukaisuData)

    var vanhat = "https://api.spacexdata.com/v3/launches/past"
    $.getJSON(vanhat, vanhatData)


    $(".topnav").append('<li><a href="index.html">Seuraava</a></li>')
    $(".topnav").append('<li><a href="tulevat.html">Tulevat</a></li>')
    $(".topnav").append('<li class="right"><a href="about.html">Tietoa sivusta</a></li>')
	
	$(".sovellus").append('<a href="SpaceExtra.apk">Lataa tästä myös sovellus!</a></li>')
});

function seuraavaLaukaisuData(data) {
  console.log("seuraavat data");
  console.log(data);

  var nimi = data["mission_name"];
  $(".nimi").append("<p>" + nimi + "</p>")

  var aika = data["launch_date_unix"];
  aika = aika + "000";
  ajastin(aika);
}

function vanhatData(data) {
  console.log("vanhat data");
  console.log(data);
  var maara = Object.keys(data).length;

  var onnistuneet = 0;
  for (var i = 0; i < maara; i++) {
    if (data[i]["launch_success"]  == true){
      onnistuneet++;
    }
  }

  $(".vanhat").append("<p> SpaceX on laukaissut " + maara + " rakettia, joista " + onnistuneet + " on onnistunut</p>")

}


function ajastin(aika) {
// Update the count down every 1 second
  var x = setInterval(function() {

    // Get todays date and time
    var now = new Date().getTime();

    // Find the distance between now and the count down date
    var distance = aika - now;

    // Time calculations for days, hours, minutes and seconds
    var days = Math.floor(distance / (1000 * 60 * 60 * 24));
    var hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    var minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    var seconds = Math.floor((distance % (1000 * 60)) / 1000);

    // Display the result in the element with id="demo"
    document.getElementById("ajastin").innerHTML = days + " päivää " + hours + " tuntia "
    + minutes + " minuuttia " + seconds + " sekuntia ";

    // If the count down is finished, write some text
    if (distance < 0) {
      clearInterval(x);
      document.getElementById("ajastin").innerHTML = "Laukaistu (toivottavasti)";
    }
  }, 1000);
}
