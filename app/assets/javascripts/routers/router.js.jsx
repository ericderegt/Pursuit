var PursuitApp = PursuitApp || { Models: {}, Collections: {}, Components: {}, Routers: {} };

PursuitApp.Routers.AppRouter = Backbone.Router.extend({
  routes: {
    '': 'index',
    'courses/:id': 'courseDetail',
    'create': 'createCourse',
    'settings': 'showSettings'
  },

  index: function(){

    var collection = new PursuitApp.Collections.PlaylistCollection();

      // var courseCollection = new PursuitApp.Collections.CourseCollection();
    PursuitApp.CoursesBox = React.render(
      <PursuitApp.Components.CoursesBox  playlist={collection} url="/api/courses" pollInterval={2000} />,
      document.getElementById('container')
    );
  },

  courseDetail: function(){

    var string = document.location.hash;
    var route_id = string.slice(9);
    var model = new PursuitApp.Models.PlaylistItem();

    PursuitApp.CourseBox = React.render(
      <PursuitApp.Components.CourseBox model={model} playUrl={"/api/playlists/" + route_id} course_id={parseInt(route_id)} url={"/api/courses/" + route_id} pollInterval={2000} />,
      document.getElementById('container')
    );    
  },

  showSettings: function(){

    React.render(<PursuitApp.Components.ShowSettings user={PursuitApp.currentUser} url={"/api/courses/user"} />,
      document.getElementById('container')
    );  
  },

  createCourse: function(){
    // React.unmountComponentAtNode($('#container')[0]); - I had been putting this code before each route and was getting Warning: setState(...): Can only update a mounted or mounting component. 

    React.render(<PursuitApp.Components.CreateCourse />, 
      document.getElementById('container')
    );
  }
})