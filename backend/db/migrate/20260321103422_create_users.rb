# frozen_string_literal: true

class CreateUsers < ActiveRecord::Migration[7.2]
  def change
    create_table :users, id: :uuid do |t|
      t.string :full_name
      t.string :email, index: { unique: true }
      t.string :password_digest

      t.timestamps
    end
  end
end
