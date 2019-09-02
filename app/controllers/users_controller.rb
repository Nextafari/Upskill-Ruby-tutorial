class UsersController < ApplicationController
  before_action :authenticate_user!
  
  def index
    
  end
  
  # GET /users/:id
  def show
    @user = User.find ( params[:id] )
  end
end