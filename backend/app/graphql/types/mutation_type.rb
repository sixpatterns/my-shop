# frozen_string_literal: true

class Types::MutationType < Types::BaseObject
  field :order_create, mutation: Mutations::OrderCreate, null: false, authorize: "OrderPolicy#create?"
  field :order_delete, mutation: Mutations::OrderDelete, null: false, authorize: "OrderPolicy#delete?"
  field :order_update, mutation: Mutations::OrderUpdate, null: false, authorize: "OrderPolicy#update?"
  field :session_create, mutation: Mutations::SessionCreate, null: false
end
