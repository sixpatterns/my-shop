# frozen_string_literal: true

class Session
  attr_reader :user

  def initialize(user)
    @user = user
  end

  def public?
    user.blank?
  end

  def user!
    raise GraphQL::ExecutionError, "Unauthorized" unless user?

    user
  end

  def user?
    user.present?
  end

  def self.find_signed!(signed_id)
    Session.new(User.find_signed!(signed_id))
  end

  def self.token(record)
    record.signed_id(expires_in: 12.hours)
  end
end
