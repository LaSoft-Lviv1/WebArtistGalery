class ArtItem < ActiveRecord::Base

  validates :name, presence: true
  #mount_uploader :source_file, PhotoUploader




  belongs_to :category, inverse_of :art_item
  belongs_to :medium, inverse_of :art_item
  belongs_to :orientation, inverse_of :art_item
  belongs_to :style, inverse_of :art_item
  belongs_to :subject, inverse_of :art_item
  belongs_to :author, inverse_of :art_item
  has_and_belongs_to_many :colors

end
