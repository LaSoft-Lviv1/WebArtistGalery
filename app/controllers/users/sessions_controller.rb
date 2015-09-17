class Users::SessionsController < Devise::SessionsController
# before_filter :configure_sign_in_params, only: [:create]
  skip_before_filter :verify_signed_out_user
  respond_to :json
  # GET /resource/sign_in
  # def new
  #   super
  # end

  def create #TODO Need understand what is it?
    email = params[:user][:email] if params[:user]
    password = params[:user][:password] if params[:user]

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

        if current_user.role == 'artist'
          render :json=> {:success=>true, :authentication_token=>LoginHelper::AuthenticationService.auth_token(current_user), :name=>current_user.author.first_name, :role =>current_user.role}
        elsif current_user.role == 'customer'
          render :json=> {:success=>true, :authentication_token=>LoginHelper::AuthenticationService.auth_token(current_user), :name=>current_user.customer.name, :role =>current_user.role}
        end

      else
        # render status: 401, json: { message: 'Invalid email or password.' }
        render :json=> {:success=>false, :message=>"Error with your login or password"}, :status=>401
      end
    else
      # render status: 401, json: { message: 'Invalid email or password.' }
      render :json=> {:success=>false, :message=>"Error with your login or password"}, :status=>401
    end

  end

  # DELETE /resource/sign_out
  def destroy
    # Fetch params
    user = LoginHelper::AuthenticationService.authenticate_user(params[:user_token])
    if user.nil?
      # sign_out :user
      render status: 404, json: { message: 'Invalid token.' }
    else
      user.authentication_token = nil
      user.save!
      sign_out user
      render status: 404, json: nil
    end
  end

  # protected

  # def configure_sign_in_params
  #   devise_parameter_sanitizer.for(:sign_in) << :attribute
  # end
end
