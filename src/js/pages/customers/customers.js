// customers.js
// This should contain all logic relating to the customers pages

var $ = require('jquery');

function InitializeCustomersPage(prevState) {
  return function(callback){
    $.get('/api/customers', function(data){
      console.log(data);
      callback({customers: data.map(function(person){
        person.PersonDOB = (new Date(person.PersonDOB)).toLocaleDateString();
        return person;
      })});
    });
  };
}

module.exports = {
  initialize: InitializeCustomersPage
};
