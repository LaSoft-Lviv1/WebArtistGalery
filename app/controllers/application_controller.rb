class ApplicationController < ActionController::Base
  include Pundit
  protect_from_forgery with: :exception
  # before_action :authenticate_user_from_token!, except: :index
  # after_action :verify_authorized, :except => :index
  rescue_from Pundit::NotAuthorizedError, with: :user_not_authorized

  def index
  end

  protected

    def authenticate_user_from_token!
      # binding.pry
      user_token = params[:user_token].presence
      user       = AuthenticationHelper::AuthenticationTokenService.authenticate_user(user_token) if user_token
      unless user && current_user && user.authentication_token == current_user.authentication_token
        render status: 401, json: { message: 'Permission denied. Please sign in.' }
      end
    end

  private

    def user_not_authorized
      render status: 401, json: { message: 'You are not authorized to perform this action.'}
    end
end