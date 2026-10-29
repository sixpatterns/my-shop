# frozen_string_literal: true

class CreateCustomers < ActiveRecord::Migration[7.2]
  def change
    create_table :customers, id: :uuid do |t|
      t.string :name, null: false
      t.string :email, null: false
      t.string :phone

      t.timestamps
    end
  end
end
