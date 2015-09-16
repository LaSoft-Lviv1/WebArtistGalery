class ArtItem < ActiveRecord::Base
  before_save :setParameters #TODO Need change the name

  validates :name, presence: true

  belongs_to :category
  belongs_to :medium
  belongs_to :orientation
  belongs_to :style
  belongs_to :subject
  belongs_to :author
  has_and_belongs_to_many :colors

  mount_uploader :source_file, PhotoUploader

  private

  def setParameters #TODO Need change the name to set_parameters
    self.in_date = Date.today #TODO Need change the name to publication_date
    self.preview_source_file = self.source_file #TODO Remove this row
  end
end
