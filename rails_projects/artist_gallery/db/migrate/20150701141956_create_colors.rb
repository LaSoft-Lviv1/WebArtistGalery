class CreateColors < ActiveRecord::Migration
  def change
    create_table :colors do |t|
      t.string :name, index: true, null: false
      t.string :hex_name, null: false
      t.integer :percentage, default: 0

      t.timestamps null: false
    end
  end
end
