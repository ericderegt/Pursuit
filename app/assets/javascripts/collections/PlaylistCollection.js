var PursuitApp = PursuitApp || { Models: {}, Collections: {}, Components: {}, Routers: {} };

PursuitApp.Collections.PlaylistCollection = Backbone.Collection.extend({
  model: PursuitApp.Models.PlaylistItem,
  url: function(){
   return 'api/playlists';
  }
});