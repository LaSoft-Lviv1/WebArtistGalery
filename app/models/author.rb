class Author < ActiveRecord::Base
  validates :first_name, :second_name,
            format: { with: /\A([A-Z][a-z ,.'`-]{2,30})\z/i, message: 'Only allows letters and numbers' },
            length: { in: 1..30, message: 'Length must be between 1 and 30' }

  mount_uploader :photo, PhotoUploader

  belongs_to :city
  belongs_to :user

  has_many :art_items
end
