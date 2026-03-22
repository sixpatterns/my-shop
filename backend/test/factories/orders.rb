# frozen_string_literal: true

FactoryBot.define do
  factory :order do
    address { Faker::Address.street_address }
    currency { "USD" }
    customer_name { Faker::Name.name }
    shipping_fee { 10 }
    status { :pending }
    subtotal { 10 }
    tax { 10 }
    total { 10 }
  end
end
