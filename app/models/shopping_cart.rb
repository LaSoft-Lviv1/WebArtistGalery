class ShoppingCart < ActiveRecord::Base

  belongs_to :user
  belongs_to :art_item

end
