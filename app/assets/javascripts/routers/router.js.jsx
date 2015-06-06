var PursuitApp = PursuitApp || { Models: {}, Collections: {}, Components: {}, Routers: {} };

PursuitApp.Routers.AppRouter = Backbone.Router.extend({
  routes: {
    '': 'index',
    'courses/:id': 'courseDetail',
    'settings': 'showSettings'
  },

  index: function(){
    React.unmountComponentAtNode($('#main-content')[0]);
      // var courseCollection = new PursuitApp.Collections.CourseCollection();
    React.render(
      <PursuitApp.Components.CoursesBox url="/api/courses" pollInterval={2000} />,
      document.getElementById('main-content')
    );
  },

  courseDetail: function(){
    React.unmountComponentAtNode($('#main-content')[0]);

    var string = document.location.hash;
    var route_id = string.slice(-1);

    React.render(
      <PursuitApp.Components.CourseBox url={"/api/courses/" + route_id}/>,
      document.getElementById('main-content')
    );    
  },

  showSettings: function(){
    React.unmountComponentAtNode($('#main-content')[0]);

    React.render(<PursuitApp.Components.ShowSettings info={PursuitApp.currentUser.attributes} />,
      document.getElementById('main-content')
    );  
  }
})