# frozen_string_literal: true

FactoryBot.define do
  factory :customer do
    email { Faker::Internet.email }
    name { Faker::Name.name }
    phone { nil }
  end
end
