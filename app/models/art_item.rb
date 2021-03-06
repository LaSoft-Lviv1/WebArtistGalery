class ArtItem < ActiveRecord::Base
  before_save :set_parameters

  validates :name, presence: true

  belongs_to :category
  belongs_to :medium
  belongs_to :orientation
  belongs_to :style
  belongs_to :subject
  belongs_to :author
  has_many :shopping_carts
  has_and_belongs_to_many :colors

  mount_uploader :source_file, PhotoUploader

  private

  def set_parameters
    self.publication_date = Date.today
    self.preview_source_file = self.source_file #TODO Remove this row
  end
end
