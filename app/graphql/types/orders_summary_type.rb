# frozen_string_literal: true

class Types::OrdersSummaryType < Types::BaseObject
  field :avg_amount, Float, null: false do
    argument :created_at_gt, GraphQL::Types::ISO8601DateTime, required: false
    argument :created_at_lt, GraphQL::Types::ISO8601DateTime, required: false
  end
  field :count_by_status, [Types::NameValueType], null: false do
    argument :created_at_gt, GraphQL::Types::ISO8601DateTime, required: false
    argument :created_at_lt, GraphQL::Types::ISO8601DateTime, required: false
  end
  field :revenue_by_month, [Types::NameValueType], null: false do
    argument :created_at_gt, GraphQL::Types::ISO8601DateTime, required: false
    argument :created_at_lt, GraphQL::Types::ISO8601DateTime, required: false
  end
  field :total_count, Int, null: false do
    argument :created_at_gt, GraphQL::Types::ISO8601DateTime, required: false
    argument :created_at_lt, GraphQL::Types::ISO8601DateTime, required: false
    argument :status, Types::Order::StatusEnum, required: false
  end
  field :total_revenue, Float, null: false do
    argument :created_at_gt, GraphQL::Types::ISO8601DateTime, required: false
    argument :created_at_lt, GraphQL::Types::ISO8601DateTime, required: false
  end

  def avg_amount(created_at_gt: nil, created_at_lt: nil)
    records = orders(created_at_gt: created_at_gt, created_at_lt: created_at_lt)
    count = records.count

    return 0 if count.zero?

    records.sum(:total) / count
  end

  def count_by_status(created_at_gt: nil, created_at_lt: nil)
    records = orders(created_at_gt: created_at_gt, created_at_lt: created_at_lt)
    records = records.group(:status).count

    records.map { |i, j| { name: i, value: j } }
  end

  def revenue_by_month(created_at_gt: nil, created_at_lt: nil)
    records = orders(created_at_gt: created_at_gt, created_at_lt: created_at_lt)
    records = records.group_by_month_of_year(:created_at, format: "%b").sum(:total)

    records.map { |i, j| { name: i, value: j } }
  end

  def total_count(created_at_gt: nil, created_at_lt: nil, status: nil)
    records = orders(created_at_gt: created_at_gt, created_at_lt: created_at_lt)
    records = records.where(status: status) if status

    records.count
  end

  def total_revenue(created_at_gt: nil, created_at_lt: nil)
    orders(created_at_gt: created_at_gt, created_at_lt: created_at_lt).sum(:total)
  end

  private

  def orders(created_at_gt: nil, created_at_lt: nil)
    records = OrderPolicy.new(context[:current_session]).scope
    records = records.where(created_at: created_at_gt..) if created_at_gt
    records = records.where(created_at: ..created_at_lt) if created_at_lt

    records
  end
end
