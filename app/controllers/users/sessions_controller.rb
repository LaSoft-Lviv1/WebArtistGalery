class Users::SessionsController < Devise::SessionsController
# before_filter :configure_sign_in_params, only: [:create]
  respond_to :json
  # GET /resource/sign_in
  # def new
  #   super
  # end

  # POST /resource/sign_in
  def create
    #sign_in(:user, User.find_by_email(params[:email]))
    super
    puts 'HI!users'
    session[:user] = current_user
    cookies[:user_email] = { :value => "#{current_user.email}", :expires => Time.now + 3600}
    cookies[:login] = { :value => "XJ12", :expires => Time.now + 3600}
  end

  # DELETE /resource/sign_out
  # def destroy
  #   reset_session
  #   # super
  # end

  # protected

  # If you have extra params to permit, append them to the sanitizer.
  # def configure_sign_in_params
  #   devise_parameter_sanitizer.for(:sign_in) << :attribute
  # end
end
