class Users::ConfirmationsController < Devise::ConfirmationsController
  skip_before_filter :authenticate_user_from_token!
  # GET /resource/confirmation/new
  # def new
  #   super
  # end

  # POST /resource/confirmation
  # def create
  #   super
  # end

  # GET /resource/confirmation?confirmation_token=abcdef
  def show
    puts 'Hello from confirmation controller!!!!!'
    self.resource = resource_class.confirm_by_token(params[:confirmation_token])

    if resource.errors.empty?
      render status: 200, json: nil
    else
      render status: 400, json: { message: resource.errors }
      # binding.pry
    end
    # super
  end
end
