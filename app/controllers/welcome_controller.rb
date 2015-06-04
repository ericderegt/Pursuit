class WelcomeController < ApplicationController
  def index
    if current_user
      render :index
    else
      redirect_to login_path
    end
  end

end
