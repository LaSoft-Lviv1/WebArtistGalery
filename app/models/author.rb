class Author < ActiveRecord::Base
  validates :first_name,
            format: { with: /\A(\w|\s)+\z/i, message: 'Only allows letters and numbers' },
            length: { in: 1..40, message: 'Length must be between 1 and 40' }

  validates :second_name,
            format: { with: /\A\w+\z/i, message: 'Only allows letters and numbers' },
            length: { in: 1..40, message: 'Length must be between 1 and 40' }

  mount_uploader :photo, PhotoUploader

  belongs_to :city
  belongs_to :user

  has_many :art_items
end
