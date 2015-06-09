module Api
  class PlaylistsController < ApplicationController
    # Get all playlists for the current user
    def index
      playlists = Playlist.joins(:user).where(user_id: current_user[:id])
      render json: playlists.to_json(:include => :course)
    end

    # Returns boolean of whether current course is being followed by logged in user
    def show
      if current_user
        playlist = Playlist.joins(:user).where({course_id: params[:id], user_id: current_user.id})
        playBool = playlist.length > 0 ? true: false
        render json: playBool.to_json
      end
    end

    def create
      if current_user
        playlist = Playlist.create({user_id: current_user.id, course_id: params[:id]})
        render json: playlist.to_json
      end
    end

    # This route goes to the course id rather than playlist id, so I'm finding the playlist that matches the current user with the appropriate course id
    def destroy
      playlist = Playlist.find_by({course_id: params[:id], user_id: current_user.id})
      playlist.destroy
      render json: playlist.to_json
    end
  end
end