class User < ActiveRecord::Base

  enum role: [:customer, :artist, :admin]

  devise :database_authenticatable, :registerable, :confirmable,
         :recoverable, :rememberable, :trackable, :validatable

  has_one :author
  has_one :customer
  has_many :shopping_carts

  def reset_authentication_token!
    # self.authentication_token = generate_authentication_token
    self.update_columns(authentication_token: generate_authentication_token)
  end

  private

    def generate_authentication_token
      loop do
        token = Devise.friendly_token
        break token unless User.where(authentication_token: token).first #TODO Why need use where?
      end
    end
end
