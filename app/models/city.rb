class City < ActiveRecord::Base

  validates :name,
            presence: true,
            format: { with: /\A(\w|\s)+\z/i, message: 'Only allows letters and numbers' },
            length: { in: 2..60, message: 'Length must be between 2 and 40' },
            uniqueness: { case_sensitive: false }

  has_many :authors

end
