class Users::SessionsController < Devise::SessionsController
  skip_before_filter :verify_signed_out_user #TODO Why we use that?
  respond_to :json

  def create #TODO Need understand what is it?
    email = params[:user][:email] if params[:user]
    password = params[:user][:password] if params[:user]

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

  def destroy
    user = LoginHelper::AuthenticationService.authenticate_user(params[:user_token])
    if user.nil?
      render status: 404, json: { message: 'Invalid token.' } #TODO Status code is not correct
    else
      user.authentication_token = nil
      user.save!
      sign_out user
      render status: 204, json: nil #TODO Why need use 204
    end
  end

end
