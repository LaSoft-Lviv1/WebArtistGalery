class Medium < ActiveRecord::Base

  validates :name,
            presence: true,
            format: { with: /\A\w+\z/i, message: 'Only allows letters and numbers' },
            length: { in: 2..40, message: 'Length must be between 2 and 40' },
            uniqueness: { case_sensitive: false }

  has_many :art_items, inverse_of: :medium

end
