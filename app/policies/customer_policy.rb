# frozen_string_literal: true

class CustomerPolicy < ApplicationPolicy
  def create?
    user?
  end

  def delete?
    user?
  end

  def scope
    Customer.all
  end

  def update?
    user?
  end
end
