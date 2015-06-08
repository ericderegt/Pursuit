module Api
  class PlaylistsController < ApplicationController
    def index
      playlists = Playlist.joins(:user).where(user_id: current_user[:id])
      render json: playlists.to_json(:include => :course)
      # how to include title as a prop?
    end

    def create
    end

    def destroy
    end
  end
end