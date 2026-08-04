# frozen_string_literal: true

class Types::CustomerType < Types::BaseObject
  field :created_at, GraphQL::Types::ISO8601DateTime, null: false
  field :email, String, null: false
  field :id, ID, null: false
  field :name, String, null: false
  field :phone, String, null: true
end
