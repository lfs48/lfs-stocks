class CreateStocks < ActiveRecord::Migration[5.2]
  def change
    create_table :stocks do |t|
      t.string :ticker, null: false
      t.integer :shares, null: false
      t.integer :owner_id, null: false

      t.index :owner_id
      t.index [:ticker, :owner_id], unique: true

      t.timestamps
    end
  end
end
