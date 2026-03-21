# frozen_string_literal: true

class Types::MutationType < Types::BaseObject
  field :session_create, mutation: Mutations::SessionCreate, null: false
end
