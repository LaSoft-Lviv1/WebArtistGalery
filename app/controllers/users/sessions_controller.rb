class Users::SessionsController < Devise::SessionsController
# before_filter :configure_sign_in_params, only: [:create]
#   skip_before_filter :verify_signed_out_user
  skip_before_filter :authenticate_user_from_token!
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
                        role:        current_user.role,
                        id:          current_user.author.id}
        elsif current_user.role == 'customer'
          render json: {status:      'success',
                        user_token:  AuthenticationHelper::AuthenticationTokenService.auth_token(current_user),
                        name:        current_user.customer.name,
                        role:        current_user.role,
                        id:          current_user.customer.id}
        end
      else
        render status: 401, json: { message: 'wrongPassword' }
      end
    else
      render status: 401, json: { message: 'wrongMail' }
    end

  end

  # DELETE /resource/sign_out
  def destroy
    # Fetch params
    # binding.pry
    user = AuthenticationHelper::AuthenticationTokenService.authenticate_user(params[:user_token])
    if user.nil? && current_user
      sign_out current_user
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
      end

      if !is_a_valid_email1?(email)
        render status: 401, json: { message: 'wrongMail' }
      elsif !is_a_valid_password?(password)
        render status: 401, json: { message: 'wrongPassword' }
      end
    end

    def is_a_valid_email?(email)
      if email.count("@") != 1
        return false

      elsif email =~ /^([\w-]+(?:\.[\w-]+)*)@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$/i then
        return true
      else
        return false
      end
    end

    def is_a_valid_email1?(email)
      (email =~ /^([\w-]+(?:\.[\w-]+)*)@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$/i) ? true : false
    end

    def is_a_valid_password?(password)
      if password =~ /^.{8,}$/
        return true
      else
        return false
      end
    end

# protected

  # def configure_sign_in_params
  #   devise_parameter_sanitizer.for(:sign_in) << :attribute
  # end
end