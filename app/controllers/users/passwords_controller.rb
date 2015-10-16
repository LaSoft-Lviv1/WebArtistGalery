class Users::PasswordsController < Devise::PasswordsController
  skip_before_filter :authenticate_user_from_token!
  # GET /resource/password/new
  # def new
  #   super
  # end

  # POST /resource/password
  def create
    puts 'Recovery password!!!!!!!!!!!!!!!!!!!!!!'
    self.resource = resource_class.send_reset_password_instructions(resource_params)

    if successfully_sent?(resource)
      render status: 200, json: nil
    else
      render status: 400, json: { message: 'Invalid email!' }
      # binding.pry
    end
  end

  # GET /resource/password/edit?reset_password_token=abcdef
  def edit
    super
  end

  # PUT /resource/password
  def update
    self.resource = resource_class.reset_password_by_token(resource_params)

    if resource.errors.empty?
      render status: 200, json: nil
      # binding.pry
    else
      render status: 400, json: { message: resource.errors }
      # binding.pry
    end
    # super
  end

  # protected

  # def after_resetting_password_path_for(resource)
  #   super(resource)
  # end

  # The path used after sending reset password instructions
  # def after_sending_reset_password_instructions_path_for(resource_name)
  #   super(resource_name)
  # end
end
