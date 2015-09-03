class AddUserRefToAuthors < ActiveRecord::Migration
  def change
    add_reference :authors, :user, index: true, foreign_key: true
  end
end
