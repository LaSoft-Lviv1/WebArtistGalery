module AuthenticationHelper
  class AuthenticationTokenService
    SECRET_KEY = Rails.application.secrets.secret_key_base

    def self.auth_token user
      JWT.encode({'exp' => 7.days.from_now.to_i, 'authentication_token' => user.authentication_token}, SECRET_KEY)
    end

    def self.authenticate_user auth_token
      begin
        decoded, _ = JWT.decode(auth_token, SECRET_KEY)
        user = User.find_by(authentication_token: decoded['authentication_token'])
        # binding.pry
        if (DateTime.now.to_i < decoded['exp'])
          user
        else
          user.update_columns(authentication_token: nil)
          sign_out user
        end
      rescue Exception => e
        # binding.pry
      end
    end
  end
end
