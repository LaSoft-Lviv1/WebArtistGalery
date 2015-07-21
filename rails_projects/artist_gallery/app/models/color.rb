class Color < ActiveRecord::Base

  validates :name,
            presence: true,
            format: { with: /\A(\w|\s)+\z/i, message: 'Only allows letters and numbers' },
            length: { in: 2..40, message: 'Length must be between 2 and 40' },
            uniqueness: { case_sensitive: false }

  validates :hex_name,
            hex_color: true,
            uniqueness: { case_sensitive: false }

  validates :percentage,
            presence: true,
            numericality: { :greater_than_or_equal_to => 0, less_than_or_equal_to: 100 }



  has_and_belongs_to_many :art_items

end
