class ReservedShoppingCart < ActiveRecord::Base
  belongs_to :art_item
  belongs_to :user
end
