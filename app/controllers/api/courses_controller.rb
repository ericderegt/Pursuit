module Api
  class CoursesController < ApplicationController
    def index
      # if current_user
      courses = Course.all
      render json: courses
    end
  end
end