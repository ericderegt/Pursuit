module Api
  class CoursesController < ApplicationController
    def index
      # if current_user
      courses = Course.all.reverse_order
      render json: courses
    end

    def show
      courseInfo = Course.find(params[:id])
      render json: courseInfo.to_json(
        :include => {
          :chapters => {:include => [:completed_chapters]},
          :user => {:only => [:username]}, 
          :tags => {:include => [:category]}
        }
      )
    end

    def getuserscourses
      courses = Course.where({user_id: current_user.id})
      render json: courses
    end

    def create
      if current_user
        course = {}
        course["title"] = params[:dataPost][:course]["0"]["title"]
        course["description"] = params[:dataPost][:course]["0"]["description"]
        if params[:dataPost][:course]["0"]["image_url"] == '' || !params[:dataPost][:course]["0"]["image_url"]
          course["image_url"] = "http://semantic-ui.com/images/wireframe/image.png" 
        else
          course["image_url"] = params[:dataPost][:course]["0"]["image_url"]
        end
        course["user_id"] = current_user.id
        newCourse = Course.create(course)

        chapters = params[:dataPost][:chapters]
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

    def destroy
      course = Course.find(params[:id])
      if current_user.id == course.user_id
        course.destroy
        render json: course.to_json
      else
        render plain: 'Error'
      end
    end

  end
end