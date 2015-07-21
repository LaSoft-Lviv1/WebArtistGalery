class Author < ActiveRecord::Base

  validates :first_name,
            format: { with: /\A(\w|\s)+\z/i, message: 'Only allows letters and numbers' },
            length: { in: 2..40, message: 'Length must be between 2 and 40' }

  validates :second_name,
            format: { with: /\A\w+\z/i, message: 'Only allows letters and numbers' },
            length: { in: 2..40, message: 'Length must be between 2 and 40' }

  validates :email_address, email: true

  mount_uploader :photo, PhotoUploader

  belongs_to :city

  has_many :art_items
end
