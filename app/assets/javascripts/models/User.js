var PursuitApp = PursuitApp || { Models: {}, Collections: {}, Components: {}, Routers: {} };

PursuitApp.Models.User = Backbone.Model.extend({
  urlRoot: "api/user"
});
