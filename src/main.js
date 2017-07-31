require('normalize.css');
const slick = require('slick-carousel');
const APIKey = "AIzaSyBsmHY9UaE57tLqSQ2YE8aSNtA0RVKC8P8";
const API_MAPS = 'https://maps.googleapis.com/maps/api/js?key=' + APIKey + '&callback=initMap';
$(document).ready(function(){
  //nav-icon
  $('#nav-icon').on("click", function(){
    $('#nav-icon-bar span').toggleClass('open');
    $('ul.menu').slideToggle("fast");
  });
  /*** 3rd party javascripts ***/
  // slick
  $("#slider").slick({
    dots: true,
    autoplay: true
  });
}); //end jQuery