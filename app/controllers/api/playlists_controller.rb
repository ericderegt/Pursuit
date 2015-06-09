module Api
  class PlaylistsController < ApplicationController
    def index
      playlists = Playlist.joins(:user).where(user_id: current_user[:id])
      render json: playlists.to_json(:include => :course)
    end

    def show
      if current_user
        playlist = Playlist.joins(:user).where({course_id: params[:id], user_id: current_user.id})
        playBool = playlist.length > 0 ? true: false
        render json: playBool.to_json
      end
    end

    def create
      if current_user
        playlist = Playlist.create({user_id: current_user.id, course_id: params[:data]})
        render json: playlist.to_json
      end
    end

    def destroy
      playlist = Playlist.find_by({course_id: params[:id], user_id: current_user.id})
      playlist.destroy
      render json: playlist.to_json
    end
  end
end