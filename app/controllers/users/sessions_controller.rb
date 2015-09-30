class Users::SessionsController < Devise::SessionsController
# before_filter :configure_sign_in_params, only: [:create]
#   skip_before_filter :verify_signed_out_user
  before_action :validate_params, only: [:create]
  respond_to :json
  # GET /resource/sign_in
  # def new
  #   super
  # end

  def create
    email = params[:user][:email] if params[:user]
    password = params[:user][:password] if params[:user]
    # Authentication
    user = User.find_by(email: email)
    if user
      if user.valid_password? password
        user.reset_authentication_token!
        sign_in(:user, user)
        if current_user.role == 'artist'
          render json: {status:      'success',
                        user_token:  AuthenticationHelper::AuthenticationTokenService.auth_token(current_user),
                        name:        current_user.author.first_name,
                        role:        current_user.role}
        elsif current_user.role == 'customer'
          render json: {status:      'success',
                        user_token:  AuthenticationHelper::AuthenticationTokenService.auth_token(current_user),
                        name:        current_user.customer.name,
                        role:        current_user.role}
        end
      else
        render status: 401, json: { message: 'Invalid email or password.' }
      end
    else
      render status: 401, json: { message: 'Invalid email or password.' }
    end

  end

  # DELETE /resource/sign_out
  def destroy
    # Fetch params
    user = AuthenticationHelper::AuthenticationTokenService.authenticate_user(params[:user_token])
    if user.nil?
      # sign_out :user
      render status: 404, json: { message: 'Invalid token.' }
    else
      user.update_columns(authentication_token: nil)
      sign_out user
      render status: 200, json: nil
    end
  end

    private

    def validate_params
      email = params[:user][:email] if params[:user]
      password = params[:user][:password] if params[:user]

      if request.format != :json
        render status: 406, json: { message: 'The request must be JSON.' }
        return
      end

      if !is_a_valid_email?(email) or !is_a_valid_password?(password)
        render status: 401, json: { message: 'The request MUST contain correct user email and password.' }
        return
      end
    end

    def is_a_valid_email?(email)
      if email.count("@") != 1 then
        return false

      elsif email =~ /^([\w-]+(?:\.[\w-]+)*)@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$/i then
        return true
      else
        return false
      end
    end

    def is_a_valid_password?(password)
      if password =~ /^.{8,}$/ then
        return true
      else
        return false
      end
    end
end
