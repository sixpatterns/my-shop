# frozen_string_literal: true

class Order < ApplicationRecord
  enum :status, { pending: 0, processing: 1, shipped: 2, delivered: 3, cancelled: 4 }

  validates :address, presence: true
  validates :currency, presence: true
  validates :customer_name, presence: true
  validates :shipping_fee, presence: true
  validates :status, presence: true
  validates :subtotal, presence: true
  validates :tax, presence: true
  validates :total, presence: true
end
