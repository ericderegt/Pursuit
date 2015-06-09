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

    # I did this because I needed another route for the settings page to show the courses that a user created
    def getuserscourses
      courses = Course.where({user_id: current_user.id})
      render json: courses
    end

    def create
      if current_user
        course = {}
        course["title"] = params[:course]["0"]["title"]
        course["description"] = params[:course]["0"]["description"]
        if params[:course]["0"]["image_url"] == '' || !params[:course]["0"]["image_url"]
          course["image_url"] = "http://semantic-ui.com/images/wireframe/image.png" 
        else
          course["image_url"] = params[:course]["0"]["image_url"]
        end
        course["user_id"] = current_user.id
        newCourse = Course.create(course)

        chapters = params[:chapters]
        chapters.each do |key, val|
          chapter = {}
          chapter["title"] = val["title"]
          chapter["link"] = val["link"]
          chapter["content"] = val["content"]
          chapter["course_id"] = newCourse.id
          Chapter.create(chapter)
        end

        render plain: 'Success!'
      end
    end
  end
end