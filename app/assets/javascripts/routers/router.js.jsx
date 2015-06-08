var PursuitApp = PursuitApp || { Models: {}, Collections: {}, Components: {}, Routers: {} };

PursuitApp.Routers.AppRouter = Backbone.Router.extend({
  routes: {
    '': 'index',
    'courses/:id': 'courseDetail',
    'create': 'createCourse',
    'settings': 'showSettings'
  },

  index: function(){
    React.unmountComponentAtNode($('#container')[0]);
      // var courseCollection = new PursuitApp.Collections.CourseCollection();
    React.render(
      <PursuitApp.Components.CoursesBox url="/api/courses" pollInterval={2000} />,
      document.getElementById('container')
    );
  },

  courseDetail: function(){
    React.unmountComponentAtNode($('#container')[0]);

    var string = document.location.hash;
    var route_id = string.slice(-1);

    React.render(
      <PursuitApp.Components.CourseBox url={"/api/courses/" + route_id}/>,
      document.getElementById('container')
    );    
  },

  showSettings: function(){
    React.unmountComponentAtNode($('#container')[0]);

    React.render(<PursuitApp.Components.ShowSettings user={PursuitApp.currentUser} />,
      document.getElementById('container')
    );  
  },

  createCourse: function(){
    React.unmountComponentAtNode($('#container')[0]);

    React.render(<PursuitApp.Components.CreateCourse />, 
      document.getElementById('container')
    );
  }
})