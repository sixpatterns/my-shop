# frozen_string_literal: true

class Types::OrderType < Types::BaseObject
  field :address, String, null: false
  field :created_at, GraphQL::Types::ISO8601DateTime, null: false
  field :currency, String, null: false
  field :customer, Types::CustomerType, scope: "CustomerPolicy", preload: :customer, null: false
  field :customer_id, ID, null: false
  field :id, ID, null: false
  field :shipping_fee, Float, null: false
  field :status, Types::Order::StatusEnum, null: false
  field :subtotal, Float, null: false
  field :tax, Float, null: false
  field :total, Float, null: false
end
