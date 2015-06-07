var PursuitApp = PursuitApp || { Models: {}, Collections: {}, Components: {}, Routers: {} };

PursuitApp.Models.User = Backbone.Model.extend({
  urlRoot: "api/user",
  sync: function(method, model, options) {
    options || (options = {});
    switch (method) {
      case "read":
        options.url = "api/user";
        return Backbone.sync(method, model, options);
      break;
      case "update":
        options.dataType = "json";
        options.method = "PUT";
        options.url = "api/user";
        return Backbone.sync(method, model, options);
      break;
    }
  }
});
