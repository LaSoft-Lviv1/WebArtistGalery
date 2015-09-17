class Users::RegistrationsController < Devise::RegistrationsController
	before_filter :configure_sign_up_params, only: :create
  respond_to :json

  def create
    build_resource(sign_up_params)
    resource.reset_authentication_token!
    resource.save
    yield resource if block_given?
    if resource.persisted?
      if resource.active_for_authentication?
        # set_flash_message :notice, :signed_up if is_flashing_format?
        sign_up(resource_name, resource)
        # binding.pry
        # respond_with resource, location: after_sign_up_path_for(resource)
      else
        # set_flash_message :notice, :"signed_up_but_#{resource.inactive_message}" if is_flashing_format?
        expire_data_after_sign_in!
        # binding.pry
        # respond_with resource, location: after_inactive_sign_up_path_for(resource)
      end
    else
      clean_up_passwords resource
      set_minimum_password_length
      # binding.pry
      # respond_with resource
    end

    # super
    puts 'Hello! Registration!'
    if current_user
      if current_user.role == 'artist'
        author = Author.create( {first_name: params[:user][:first_name], second_name: params[:user][:second_name], user_id: current_user.id} )
        render :json=> {:success=>true, :authentication_token=>LoginHelper::AuthenticationService.auth_token(current_user), :name=>current_user.author.first_name, :role =>current_user.role}
        # binding.pry
      elsif current_user.role == 'customer'
        customer = Customer.create( {user_id: current_user.id, name: params[:user][:name]} )
        render :json=> {:success=>true, :authentication_token=>LoginHelper::AuthenticationService.auth_token(current_user), :name=>current_user.customer.name, :role =>current_user.role}
        # binding.pry
      end
    else
      render :json=> {:success=>false, :message=>"Some mistake!"}, :status=>401
      # binding.pry
    end
    # binding.pry
  end

	private

  def configure_sign_up_params
    devise_parameter_sanitizer.for(:sign_up) << :role
  end
end
