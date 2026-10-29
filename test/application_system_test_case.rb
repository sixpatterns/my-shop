# frozen_string_literal: true

require "test_helper"

class ApplicationSystemTestCase < ActionDispatch::SystemTestCase
  driven_by :cuprite, options: { headless: ENV.fetch("CI", false) }

  include ActionDispatch::TestProcess::FixtureFile
  include AntdHelpers
  include SessionsHelper
  include WaitForPendingRequests

  def admin_url(path)
    "http://#{ENV.fetch('ADMIN_HOST')}#{path}"
  end
end
