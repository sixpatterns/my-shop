# frozen_string_literal: true

class Mutations::OrderCreate < Mutations::BaseMutation
  argument :attributes, Types::OrderAttributes, required: true

  type Boolean, null: false

  def resolve(attributes:)
    record = Order.new(**attributes)

    raise_error record.errors.full_messages.to_sentence unless record.save

    true
  end
end
