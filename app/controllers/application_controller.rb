class ApplicationController < ActionController::Base
  # Prevent CSRF attacks by raising an exception.
  # For APIs, you may want to use :null_session instead or :exception.
  #before_filter :authenticate_user!
  protect_from_forgery with: :exception

  def index
  end

  def after_sign_in_path_for(resource)
   root_path
  end
end
