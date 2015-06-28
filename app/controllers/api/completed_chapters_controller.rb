module Api
  class CompletedChaptersController < ApplicationController
    def index
      completed = CompletedChapter.joins(:user).where(user_id: current_user[:id])
      render json: completed.to_json
    end

    def create
      if current_user
        completed = CompletedChapter.create({user_id: current_user.id, chapter_id: params[:data]})
        render json: completed.to_json
      end
    end

    def destroy
      completed = CompletedChapter.find_by({chapter_id: params[:id], user_id: current_user.id})
      completed.destroy
      render json: completed.to_json
    end
  end
end