class RenameColumnInDateInArtItemToPublicationDate < ActiveRecord::Migration
  def change
    rename_column :art_items, :in_date, :publication_date
  end
end
