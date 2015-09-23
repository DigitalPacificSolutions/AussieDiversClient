var CalendarTemplate = require('./calendar.handlebars');

function daysInMonth(year, month) {
  var daysInMonth = 0, date;
  do {
    date = new Date(year,month,++daysInMonth)
  } while(date.getDate() === daysInMonth)
  return --daysInMonth;
}

function ShowCalendarPage() {
  var weeks = [];
  for(var i = 0; i < 5; i++) {
    weeks.push([0,0,0,0,0,0,0]);
  }

  var today = new Date();
  var firstOfMonth = new Date(today.getFullYear(),today.getMonth(),1)

  var day = firstOfMonth.getDay();
  for(var i = 1; i <= daysInMonth(today.getFullYear(), today.getMonth());i++){
    weeks[Math.floor(day / 7)][Math.floor(day % 7)] = i;
    day++;
  }

  return CalendarTemplate({weeks: weeks});
}

module.exports = ShowCalendarPage;
