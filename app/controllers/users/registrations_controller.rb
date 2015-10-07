class Users::RegistrationsController < Devise::RegistrationsController
	before_action :configure_sign_up_params, only: :create
  skip_before_filter :authenticate_user_from_token!
  respond_to :json

  def create
    build_resource(sign_up_params)
    resource.save
    if resource.persisted?
      if resource
        resource.reset_authentication_token!
        if resource.role == 'artist'
          author = Author.create( {first_name:  params[:user][:first_name],
                                   second_name: params[:user][:second_name],
                                   user_id:     resource.id} )
          if author.valid?
            sign_up(resource_name, resource)
            render json: {status:      'success',
                          user_token:  AuthenticationHelper::AuthenticationTokenService.auth_token(current_user),
                          name:        current_user.author.first_name,
                          role:        current_user.role}
            # binding.pry
          else
            resource.delete
            render json: {success: false,   message: "Some mistake with own data!"}, :status=>401
            # binding.pry
          end
        elsif resource.role == 'customer'
          customer = Customer.create( {user_id: resource.id,
                                       name:    params[:user][:name]} )
          if customer.valid?
            sign_up(resource_name, resource)
            render json: {status:      'success',
                          user_token:  AuthenticationHelper::AuthenticationTokenService.auth_token(current_user),
                          name:        current_user.customer.name,
                          role:        current_user.role}
            # binding.pry
          else
            resource.delete
            render json: {success: false,   message: "Some mistake with own data!"}, :status=>401
            # binding.pry
          end
        end
      else
        render json: {success: false,   message: "Some mistake with email or password!"}, :status=>401
        expire_data_after_sign_in!
        # binding.pry
      end
    else
      render json: {success: false,   message: "Some mistake with email or password!"}, :status=>401
      clean_up_passwords resource
      set_minimum_password_length
      # binding.pry
    end
    puts 'Hello! Registration!'
  end

	private

  def configure_sign_up_params
    devise_parameter_sanitizer.for(:sign_up) << :role
  end
end
