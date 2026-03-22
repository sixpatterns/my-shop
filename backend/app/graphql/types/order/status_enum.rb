# frozen_string_literal: true

class Types::Order::StatusEnum < Types::BaseEnum
  graphql_name "OrderStatusEnum"

  Order.statuses.each_key { |i| value(i) }
end
