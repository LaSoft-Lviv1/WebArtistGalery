class RemoveEmailAddressFromAuthors < ActiveRecord::Migration
  def change
    remove_column :authors, :email_address, :string
  end
end
