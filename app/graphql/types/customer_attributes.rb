# frozen_string_literal: true

class Types::CustomerAttributes < Types::BaseInputObject
  argument :email, String, required: false
  argument :name, String, required: false
  argument :phone, String, required: false
end
