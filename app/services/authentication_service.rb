class AuthenticationService
  SECRET_KEY = Rails.application.secrets.secret_key_base

  def initialize user
    @user = user
  end

  def auth_token
    JWT.encode({'exp' => 7.days.from_now.to_i, 'authentication_token' => @user.authentication_token}, SECRET_KEY)
  end

  def self.authenticate_user auth_token
    decoded, _ = JWT.decode(auth_token, SECRET_KEY)
    user = User.find_by(authentication_token: decoded['authentication_token'])

    if (user.last_sign_in_at.to_i < decoded['exp'])
      user
    else
      return
    end
  end

  private

  attr_reader :user
end