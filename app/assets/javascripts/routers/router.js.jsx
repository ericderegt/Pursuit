var PursuitApp = PursuitApp || { Models: {}, Collections: {}, Components: {}, Routers: {} };

PursuitApp.Routers.AppRouter = Backbone.Router.extend({
  routes: {
    '': 'index'
  },

  index: function(){
    // var courseCollection = new PursuitApp.Collections.CourseCollection();

  React.render(<PursuitApp.Components.Timer />, document.getElementById('main-content'));
  // React.render(React.createElement(PursuitApp.Components.Courses, null), document.getElementById('main-content'));

  }
})