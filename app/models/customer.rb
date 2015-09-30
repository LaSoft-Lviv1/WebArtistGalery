class Customer < ActiveRecord::Base
  validates :name,
            format: { with: /\A([A-Z][a-z ,.'`-]{2,30})\z/i, message: 'Only allows letters and numbers' },
            length: { in: 1..30, message: 'Length must be between 1 and 30' }
  belongs_to :user
end
