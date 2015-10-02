class ApplicationController < ActionController::Base
  # protect_from_forgery with: :exception

  def index
  end

  protected

    def authenticate_user_from_token!
      user_token = params[:user_token].presence
      user       = user_token && AuthenticationHelper::AuthenticationTokenService.authenticate_user(user_token)
      if user.authentication_token == current_user.authentication_token
        current_user
        # sign_in user
      else
        render status: 401, json: { message: 'Permission denide. Please sign in.' }
      end
    end
end