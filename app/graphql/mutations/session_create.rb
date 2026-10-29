# frozen_string_literal: true

class Mutations::SessionCreate < Mutations::BaseMutation
  argument :email, String, required: true
  argument :password, String, required: true

  field :full_name, String, null: false
  field :token, String, null: false

  def resolve(email:, password:)
    user = User.find_by!(email: email)

    raise_error "Invalid password" unless user.authenticate(password)

    { full_name: user.full_name, token: Session.token(user) }
  end
end
