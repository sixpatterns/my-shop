# frozen_string_literal: true

class Mutations::CustomerDelete < Mutations::BaseMutation
  argument :id, ID, required: true

  type Boolean, null: false

  def resolve(id:)
    record = CustomerPolicy.new(context[:current_session]).scope.find(id)

    raise_error record.errors.full_messages.to_sentence unless record.destroy

    true
  end
end
