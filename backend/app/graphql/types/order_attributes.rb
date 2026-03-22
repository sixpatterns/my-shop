# frozen_string_literal: true

class Types::OrderAttributes < Types::BaseInputObject
  argument :address, String, required: false
  argument :currency, String, required: false
  argument :customer_name, String, required: false
  argument :shipping_fee, Float, required: false
  argument :status, Types::Order::StatusEnum, required: false
  argument :subtotal, Float, required: false
  argument :tax, Float, required: false
  argument :total, Float, required: false
end
