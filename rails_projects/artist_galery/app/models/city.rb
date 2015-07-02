class City < ActiveRecord::Base

  validates :name,
            presence: true,
            format: { with: /\A\w+\z/i, message: 'Only allows letters and numbers' },
            length: { in: 2..60, message: 'Length must be between 2 and 40' },
            uniqueness: { case_sensitive: false }

end
