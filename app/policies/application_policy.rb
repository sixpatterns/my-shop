# frozen_string_literal: true

class ApplicationPolicy
  attr_reader :session

  delegate \
    :public?,
    :user!,
    :user?,
    to: :session

  def initialize(session)
    @session = session
  end
end
