class User < ActiveRecord::Base
  validates :password, presence: true,
            :format => {:with => /\A((?=\S*?[A-Z])(?=\S*?[a-z])(?=\S*?[0-9]).{8,})\S\z/, message: "Password must include at least one lowercase letter, one uppercase letter, and one digit."}

  enum role: [:customer, :artist, :admin]

  devise :database_authenticatable, :registerable, :confirmable,
         :recoverable, :rememberable, :trackable, :validatable

  has_one :author
  has_one :customer
  has_many :shopping_carts

  def ensure_authentication_token #TODO When you need use this method?
	  reset_authentication_token! if authentication_token.blank?
  end

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
