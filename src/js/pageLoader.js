/*
Pages - Define Initialize(prevState) and Events
ex.
{
  initialize: function(prevState){ return {}; },
  events: [
    {
      selector: '.some-btn'
      on: 'click',
      action: function(event, state){}
    }
  ]

}
*/

function RegisterPage(routes, component, template) {
  this.pages.push({
    routes: routes.length ? routes : [routes],
    initialize: component.initialize,
    state: {},
    events: component.events || [],
    template: template
  });
}

function LoadPath(path, rootElement, selectElementFn) {
  for(pageIndex in this.pages) {
    var page = this.pages[pageIndex];
    var matches = page.routes.reduce(function(last, route){
      return last || path.match(route);
    }, false);

    if(matches) {
      return LoadPage(page, rootElement, selectElementFn); 
    }
  }
  console.debug('*** Route not found ***');
}

function LoadPage(page, rootElement, selectElementFn) {
  page.state = page.initialize(page.state);
  rootElement.innerHTML = page.template(page.state);
  page.events.forEach(function(event){
    selectElementFn(event.selector).addEventListener(event.on,
      function(eventObj){
        event.action(eventObj, page.state);
        LoadPage(page, rootElement, selectElementFn);
      });
  });
}

module.exports = {
  RegisterPage: RegisterPage,
  LoadPath: LoadPath,
  pages: []
};
