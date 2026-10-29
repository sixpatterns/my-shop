# frozen_string_literal: true

class Mutations::OrderDelete < Mutations::BaseMutation
  argument :id, ID, required: true

  type Boolean, null: false

  def resolve(id:)
    record = OrderPolicy.new(context[:current_session]).scope.find(id)

    raise_error record.errors.full_messages.to_sentence unless record.destroy

    true
  end
end
