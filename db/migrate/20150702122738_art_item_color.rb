class ArtItemColor < ActiveRecord::Migration
  def change
    create_join_table :art_items, :colors
  end
end
