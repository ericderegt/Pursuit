module Api
  class ChaptersController < ApplicationController
    def index
      # if current_user
      chapters = Chapter.all
      render json: chapters
    end
  end
end