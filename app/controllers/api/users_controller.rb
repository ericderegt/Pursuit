module Api
  class UsersController < ApplicationController

    def show
      if current_user
        user = current_user
        render json: user
      end
    end

    def update
      if current_user
        user = User.find(@current_user.id)
        user.update(user_params)

        render json: user
        # How do I send back a message to display on page?
      else
        render plain: "Update unsuccessful"
      end
    end

    private
      def user_params
        params.require(:user).permit(:username, :email, :password,
                                     :password_confirmation)
      end
  end
end