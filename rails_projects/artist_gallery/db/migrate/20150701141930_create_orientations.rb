class CreateOrientations < ActiveRecord::Migration
  def change
    create_table :orientations do |t|
      t.string :name, index: true, null: false

      t.timestamps null: false
    end
  end
end
