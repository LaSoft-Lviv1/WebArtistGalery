module LoginHelper #TODO Need change the name
  class AuthenticationService #TODO Need change the name
    SECRET_KEY = Rails.application.secrets.secret_key_base

    def self.auth_token user
      JWT.encode({'exp' => 7.days.from_now.to_i, 'id' => user.authentication_token}, SECRET_KEY) #TODO Change id to authentication_token
    end

    def self.authenticate_user auth_token
      decoded, _ = JWT.decode(auth_token, SECRET_KEY)
      user = User.find_by(authentication_token: decoded['id'])

      # binding.pry
      if (DateTime.now.to_i < decoded['exp'])
        user
      else
        return #TODO What is it?
      end
    end

  end
end
