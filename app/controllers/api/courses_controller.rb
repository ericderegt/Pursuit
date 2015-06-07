module Api
  class CoursesController < ApplicationController
    def index
      # if current_user
      courses = Course.all.reverse_order
      render json: courses
    end

    def show
      courseInfo = Course.find(params[:id])
      render json: courseInfo.to_json(:include => [:chapters, :user, :tags => {include: :category}])
    end

    def create
      if current_user
        course = {}
        course["title"] = params[:dataPost][:course]["0"]["title"]
        course["description"] = params[:dataPost][:course]["0"]["description"]
        course["image_url"] = course_title = params[:dataPost][:course]["0"]["image_url"]
        course["user_id"] = current_user.id
        Course.create(course)

        chapters = params[:dataPost][:chapters]
        chapters.each do |key, val|
          chapter = {}
          chapter["title"] = val["title"]
          chapter["link"] = val["link"]
          chapter["content"] = val["content"]
          chapter["course_id"] = Course.last.id
          Chapter.create(chapter)
        end

        render plain: 'Success!'
      end
    end
  end
end