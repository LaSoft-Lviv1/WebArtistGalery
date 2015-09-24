class Customer < ActiveRecord::Base
  validates :name,
            format: { with: /\A(\w|\s)+\z/i, message: 'Only allows letters and numbers' },
            length: { in: 1..40, message: 'Length must be between 1 and 40' }
  belongs_to :user
end
