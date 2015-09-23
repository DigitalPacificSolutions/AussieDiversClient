
require('../index.html');
require('bootstrap-sass');
require('../styles/stylesheet.scss');

var $ = require('jquery');

var HomePage     = require('./pages/home/home.js');
var CalendarPage = require('./pages/calendar/calendar.js');

$(function(){

  function isSmallScreen() {
    return window.parent.document.documentElement.clientWidth < 768;
  }

  function checkViewport() {
    if( isSmallScreen() && !$(".sidebar-wrapper").hasClass("toggled")) {
      $(".sidebar-wrapper").addClass("toggled");
    }
    if(!isSmallScreen() && $(".sidebar-wrapper").hasClass("toggled")) {
      $(".sidebar-wrapper").removeClass("toggled");
    }
  }

  $(window).resize(checkViewport);

  checkViewport();

  $("#menu-toggle").click(function(e) {
      e.preventDefault();
      $(".sidebar-wrapper").toggleClass("toggled");
  });

  function LoadPage(hash) {
    hash = hash || '#home';
    var hashes = {'#home': HomePage,
                  '#calendar': CalendarPage};

    if(hashes[hash]) {
      $('.page-content').html(hashes[hash]());
    } else {
      window.location.hash = '';
    }
  }

  $(window).on('hashchange', function(){
    LoadPage(window.location.hash);
  });

  LoadPage(window.location.hash);

  function CloseMenu() {
    if(isSmallScreen()) {
      $(".sidebar-wrapper").toggleClass("toggled");
    }
  }

  $(".sidebar-nav a").on('click', CloseMenu);

});
