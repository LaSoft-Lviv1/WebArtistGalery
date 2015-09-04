module LoginHelper
end

class AuthenticationService
  SECRET_KEY = Rails.application.secrets.secret_key_base

  def initialize user
    @user = user
  end

  def auth_token
    JWT.encode({'exp' => 7.days.from_now.to_i, 'id' => user.id}, SECRET_KEY)
  end

  def self.authenticate_user auth_token
    decoded, _ = JWT.decode(auth_token, SECRET_KEY)
    User.find_by(id: decoded['id'])
  end

  private

  attr_reader :user
end