class Users::SessionsController < Devise::SessionsController
# before_filter :configure_sign_in_params, only: [:create]
  skip_before_filter :verify_signed_out_user
  respond_to :json
  # GET /resource/sign_in
  # def new
  #   super
  # end

  # POST /resource/sign_in
  def create
    # Fetch params
    email = params[:user][:email] if params[:user]
    password = params[:user][:password] if params[:user]
    # id = User.find_by(email: email).try(:id) if email.presence

    # Validations
    if request.format != :json
      render status: 406, json: { message: 'The request must be JSON.' }
      return
    end

    if email.nil? or password.nil?
      render status: 400, json: { message: 'The request MUST contain the user email and password.' }
      return
    end

    # Authentication
    user = User.find_by(email: email)

    if user
      if user.valid_password? password
        user.reset_authentication_token!
        user.save!
        sign_in(:user, user)
        # Note that the data which should be returned depends heavily of the API client needs.
        # render status: 200, json: { email: user.email, authentication_token: user.authentication_token }
        render :json=> {:success=>true, :authentication_token=>LoginHelper::AuthenticationService.auth_token(current_user), :email=>current_user.email, :role =>current_user.role}
        # redirect_to '/#'
        # binding.pry
      else
        # render status: 401, json: { message: 'Invalid email or password.' }
        render :json=> {:success=>false, :message=>"Error with your login or password"}, :status=>401
      end
    else
      # render status: 401, json: { message: 'Invalid email or password.' }
      render :json=> {:success=>false, :message=>"Error with your login or password"}, :status=>401
    end

    # sign_in(:user, User.find_by_email(params[:email]))
    # super
    # puts 'HI!users'
    # session[:user] = current_user
    # cookies[:user_email] = { :value => "#{current_user.email}", :expires => Time.now + 3600}
    # cookies[:login] = { :value => "XJ12", :expires => Time.now + 3600}
  end

  # DELETE /resource/sign_out
  def destroy
    # Fetch params
    puts 'from destroy'
    # binding.pry
    user = LoginHelper::AuthenticationService.authenticate_user(params[:user_token])
    # binding.pry
    if user.nil?
      # sign_out :user
      render status: 404, json: { message: 'Invalid token.' }
    else
      user.authentication_token = nil
      user.save!
      sign_out user
      render status: 204, json: nil
      # binding.pry
    end
    # binding.pry
  end

  # protected

  # If you have extra params to permit, append them to the sanitizer.
  # def configure_sign_in_params
  #   devise_parameter_sanitizer.for(:sign_in) << :attribute
  # end
end
