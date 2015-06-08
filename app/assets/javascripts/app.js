var PursuitApp = PursuitApp || { Models: {}, Collections: {}, Components: {}, Routers: {} };


$(function(){
  PursuitApp.currentUser = new PursuitApp.Models.User();
  var promise = PursuitApp.currentUser.fetch();
  
  promise.done(function(){
    PursuitApp.myRouter = new PursuitApp.Routers.AppRouter();
    Backbone.history.start();
  });
});