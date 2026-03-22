# frozen_string_literal: true

class OrderPolicy < ApplicationPolicy
  def create?
    user?
  end

  def delete?
    user?
  end

  def scope
    Order.all
  end

  def update?
    user?
  end
end
