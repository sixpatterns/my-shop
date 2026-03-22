# frozen_string_literal: true

class Types::QueryType < Types::BaseObject
  field :order, Types::OrderType, null: false do
    argument :id, ID, required: true
  end
  field :orders, [Types::OrderType], null: false
  field :orders_summary, Types::OrdersSummaryType, null: false

  def order(id:)
    OrderPolicy.new(context[:current_session]).scope.find(id)
  end

  def orders
    OrderPolicy.new(context[:current_session]).scope
  end

  def orders_summary
    {}
  end
end
