module Api
  class CoursesController < ApplicationController
    def index
      # if current_user
      courses = Course.all
      render json: courses
    end

    def show
      courseInfo = Course.find(params[:id])
      render json: courseInfo.to_json(:include => [:chapters, :user, :tags => {include: :category}])
    end

    def create
      byebug
    end
  end
end