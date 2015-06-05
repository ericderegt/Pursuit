var PursuitApp = PursuitApp || { Models: {}, Collections: {}, Components: {}, Routers: {} };

PursuitApp.Collections.CourseCollection = Backbone.Collection.extend({
  initialize: function(options){
    this.today = moment().format('YYYYMMDD');
  },
  model: PursuitApp.Models.Course,
  url: function(){
   return 'api/courses';
  }
});