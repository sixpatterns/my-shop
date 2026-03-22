# frozen_string_literal: true

class Mutations::OrderUpdate < Mutations::BaseMutation
  argument :attributes, Types::OrderAttributes, required: true
  argument :id, ID, required: true

  type Boolean, null: false

  def resolve(attributes:, id:)
    record = OrderPolicy.new(context[:current_session]).scope.find(id)

    raise_error record.errors.full_messages.to_sentence unless record.update(**attributes)

    true
  end
end
