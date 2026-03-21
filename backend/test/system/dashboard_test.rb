# frozen_string_literal: true

require "application_system_test_case"

class DashboardTest < ApplicationSystemTestCase
  test "dashboard" do
    user = create(:user)

    sign_in(user)

    visit path_for(:frontend, "/dashboard")
    wait_for_pending_requests

    assert_selector "h1", text: "Dashboard"
  end
end
