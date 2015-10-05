class ApplicationController < ActionController::Base
  protect_from_forgery with: :exception

  def index
  end

  protected

    def authenticate_user_from_token!
      user_token = params[:user_token].presence
      user       = AuthenticationHelper::AuthenticationTokenService.authenticate_user(user_token) if user_token
      unless user && current_user && user.authentication_token == current_user.authentication_token
        render status: 401, json: { message: 'Permission denied. Please sign in.' }
      end
    end
end