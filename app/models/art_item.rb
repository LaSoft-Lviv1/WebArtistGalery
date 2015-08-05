class ArtItem < ActiveRecord::Base


  before_save :setParameters

  validates :name, presence: true
  mount_uploader :source_file, PhotoUploader
  #mount_uploader :preview_source_file, PhotoUploader

  belongs_to :category
  belongs_to :medium
  belongs_to :orientation
  belongs_to :style
  belongs_to :subject
  belongs_to :author
  has_and_belongs_to_many :colors

  def setParameters
    self.in_date = Date.today
    self.preview_source_file = self.source_file

  end

end
