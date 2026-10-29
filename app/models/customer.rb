# frozen_string_literal: true

class Customer < ApplicationRecord
  has_many :orders, dependent: :restrict_with_error

  validates :email, presence: true
  validates :name, presence: true
end
