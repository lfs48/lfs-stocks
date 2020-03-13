class CreateTransactions < ActiveRecord::Migration[5.2]
  def change
    create_table :transactions do |t|
      t.integer :purchaser_id, null: false
      t.string :ticker, null: false
      t.decimal :price, null: false
      t.integer :quantity, null: false

      t.index :purchaser_id

      t.timestamps
    end
  end
end
