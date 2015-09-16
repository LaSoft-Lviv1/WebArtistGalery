class ApplicationController < ActionController::Base
  protect_from_forgery with: :exception

  def index
  end

  def after_sign_in_path_for(resource) #TODO Why need this method?
   root_path
  end

  private

    def authenticate_user_from_token! #TODO Need change this method
      user_token = params[:user_token].presence
      user       = user_token && User.find_by_authentication_token(user_token.to_s)
      if user
        # Notice we are passing store false, so the user is not
        # actually stored in the session and a token is needed
        # for every request. If you want the token to work as a
        # sign in token, you can simply remove store: false.
        sign_in user, store: false
      end
    end
end
