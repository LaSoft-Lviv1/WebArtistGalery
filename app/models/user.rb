class User < ActiveRecord::Base
  enum role: [:customer, :artist, :admin]

  devise :database_authenticatable, :registerable,
         :recoverable, :rememberable, :trackable, :validatable

  has_one :author
  has_one :customer

  def ensure_authentication_token #TODO When you need use this method?
	  reset_authentication_token! if authentication_token.blank?
  end

  private

  def reset_authentication_token!
    self.authentication_token = generate_authentication_token
  end

  def generate_authentication_token
    loop do
      token = Devise.friendly_token
      break token unless User.where(authentication_token: token).first #TODO Why need use where?
    end
  end
end
