# frozen_string_literal: true

require "application_system_test_case"

class DashboardTest < ApplicationSystemTestCase
  test "orders summary" do
    user = create(:user)
    create(:order, status: "delivered", total: 100)
    create(:order, status: "pending", total: 50)

    sign_in(user)

    visit path_for(:frontend, "/dashboard")
    wait_for_pending_requests

    assert_selector "h1", text: "Dashboard"

    within ".ant-card", text: "Total revenue" do
      assert_text "$150.00"
    end

    within ".ant-card", text: "Average order value" do
      assert_text "$75.00"
    end

    within ".ant-card", text: "Total orders" do
      assert_text "2"
    end

    within ".ant-card", text: "Total pending orders" do
      assert_text "1"
    end
  end
end
