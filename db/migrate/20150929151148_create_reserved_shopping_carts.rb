class CreateReservedShoppingCarts < ActiveRecord::Migration
  def change
    create_table :reserved_shopping_carts do |t|
      t.datetime :order_date
      t.references :art_item, index: true, foreign_key: true
      t.references :user, index: true, foreign_key: true

      t.timestamps null: false
    end
  end
end
