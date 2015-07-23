class CreateAuthors < ActiveRecord::Migration
  def change
    create_table :authors do |t|
      t.string :first_name, null: true
      t.string :second_name, index: true, null: false
      t.string :info_about, null: true
      t.string :photo, null: true
      t.string :phone_number, null: false
      t.string :email_address, null: false
      t.references :city

      t.timestamps null: false
    end
  end
end
