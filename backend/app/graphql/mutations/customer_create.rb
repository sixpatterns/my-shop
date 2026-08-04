# frozen_string_literal: true

class Mutations::CustomerCreate < Mutations::BaseMutation
  argument :attributes, Types::CustomerAttributes, required: true

  type Boolean, null: false

  def resolve(attributes:)
    record = Customer.new(**attributes)

    raise_error record.errors.full_messages.to_sentence unless record.save

    true
  end
end
