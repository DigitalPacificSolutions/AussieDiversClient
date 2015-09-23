HompageTemplate = require('./home.handlebars');

function ShowHomePage() {
  return HompageTemplate({user: 'Fish Foot Brother FORREST'});
}

module.exports = ShowHomePage;
