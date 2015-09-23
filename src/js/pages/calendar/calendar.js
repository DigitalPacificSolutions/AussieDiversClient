// calendar.js
// This should contain all logic relating to the calendar

function InitializeCalendarPage(prevState) {
  var date = prevState.date || new Date();
  var weeks = [], months = ['January', 'February', 'March', 'April',
  'May','June','July','August','September', 'October','November','December'];
  var firstOfMonth = new Date(date.getFullYear(),date.getMonth(),1)
  var day = firstOfMonth.getDay();

  for(var i = 1; i <= daysInMonth(date.getFullYear(), date.getMonth());i++){
    if(Math.floor(day / 7) >= weeks.length) {
      weeks.push([0,0,0,0,0,0,0]);
    }
    weeks[Math.floor(day / 7)][Math.floor(day % 7)] = i;
    day++;
  }

  return {
    weeks: weeks,
    title: months[date.getMonth()]+' '+date.getFullYear(),
    date: date
  };

}

// Helper function
function daysInMonth(year, month) {
  var daysInMonth = 0, date;
  do {
    date = new Date(year,month,++daysInMonth)
  } while(date.getDate() === daysInMonth)
  return --daysInMonth;
}

var events = [
  {
    selector: '.previous-month',
    on: 'click',
    action: function(event, state) {
      event.preventDefault();
      state.date = new Date(state.date.getFullYear(), state.date.getMonth()-1,
          state.date.getDay());
    }
  },
  {
    selector: '.next-month',
    on: 'click',
    action: function(event, state) {
      event.preventDefault();
      state.date = new Date(state.date.getFullYear(), state.date.getMonth()+1,
          state.date.getDay());
    }
  }
]

module.exports = {
  initialize: InitializeCalendarPage,
  events: events
};
