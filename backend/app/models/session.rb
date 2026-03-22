# frozen_string_literal: true

class Session
  attr_reader :user_id

  def initialize(user_id)
    @user_id = user_id
  end

  def public?
    user_id.blank?
  end

  def user!
    @user ||= begin
      raise GraphQL::ExecutionError, "Unauthorized" unless user?

      User.find(user_id)
    end
  end

  def user?
    user_id.present?
  end

  def self.find_signed!(header)
    user_id = JWT.decode(header, secret)[0]["user_id"]

    Session.new(user_id)
  end

  def self.secret
    @secret ||= Rails.application.credentials.secret_key_base || SecureRandom.uuid
  end

  def self.token(record)
    exp = 12.hours.from_now.to_i

    JWT.encode({ exp: exp, user_id: record.id }, secret)
  end
end
