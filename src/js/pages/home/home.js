HompageTemplate = require('./home.handlebars');

function ShowHomePage() {
  return HompageTemplate({user: 'Bob'});
}

module.exports = ShowHomePage;
