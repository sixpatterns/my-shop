# frozen_string_literal: true

class CreateOrders < ActiveRecord::Migration[7.2]
  def change
    create_table :orders, id: :uuid do |t|
      t.decimal :shipping_fee, null: false
      t.decimal :subtotal, null: false
      t.decimal :tax, null: false
      t.decimal :total, null: false
      t.integer :status, null: false, index: true
      t.string :address, null: false
      t.string :currency, null: false
      t.string :customer_name, null: false

      t.timestamps
    end
  end
end
