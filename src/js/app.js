// app.js
// requires all of the base page assets, along with all of the 
// individual pages and registers them with the Page Loader.
// Sets up the navigation

require('../index.html');
require('bootstrap-sass');
require('../styles/stylesheet.scss');

var $ = require('jquery');

var PageLoader       = require('./pageLoader.js');

// Require pages
var HomePage         = require('./pages/home/home.js');
var HomeTemplate     = require('./pages/home/home.handlebars');
var CalendarPage     = require('./pages/calendar/calendar.js');
var CalendarTemplate = require('./pages/calendar/calendar.handlebars');

PageLoader.RegisterPage([/^\/$/, /^\/home\/?$/], HomePage, HomeTemplate);
PageLoader.RegisterPage(/^\/calendar\/?$/, CalendarPage, CalendarTemplate);


// TODO: Simplify this function

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

  // function LoadPage(path) {
  //   var routes = [
  //     {test: /^\/$/,            content: HomePage},
  //     {test: /^\/home\/?$/,     content: HomePage},
  //     {test: /^\/calendar\/?$/, content: CalendarPage}
  //   ];
  // }

  function SelectElement(selector) {
    return $(selector)[0];
  }

  $(window).on('popstate', function(){
    PageLoader.LoadPath(window.location.pathname, SelectElement('.page-content'),
        SelectElement);
  });

  PageLoader.LoadPath(window.location.pathname, SelectElement('.page-content'),
      SelectElement);

  $("a.virtual").on("click", function(e){
    var path = e.target.getAttribute('href');
    e.preventDefault();
    history.pushState({},'',path);
    PageLoader.LoadPath(window.location.pathname, SelectElement('.page-content'),
      SelectElement);
  });

  function CloseMenu() {
    if(isSmallScreen()) {
      $(".sidebar-wrapper").toggleClass("toggled");
    }
  }
  $(".sidebar-nav a").on('click', CloseMenu);

});
