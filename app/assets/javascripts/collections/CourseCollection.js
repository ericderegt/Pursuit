var PursuitApp = PursuitApp || { Models: {}, Collections: {}, Components: {}, Routers: {} };

PursuitApp.Collections.CourseCollection = Backbone.Collection.extend({
  model: PursuitApp.Models.Course,
  url: function(){
   return 'api/courses';
  }
});