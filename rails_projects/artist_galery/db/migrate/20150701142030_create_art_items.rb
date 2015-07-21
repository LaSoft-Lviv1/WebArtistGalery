class CreateArtItems < ActiveRecord::Migration
  def change
    create_table :art_items do |t|

      t.string :name, null: false
      t.string :source_file, null: false
      t.string :preview_source_file, null: false
      t.text :description, null: true
      t.decimal :price, null: true
      t.date :in_date, null: false
      t.date :sold_date, null: true
      t.float :vertical_size
      t.float :horizontal_size
      t.text :keywords

      t.references :style
      t.references :media
      t.references :category
      t.references :orientation
      t.references :subject
      t.references :author

      t.timestamps null: false
    end
  end
end
