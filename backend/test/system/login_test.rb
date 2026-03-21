# frozen_string_literal: true

require "application_system_test_case"

class LoginTest < ApplicationSystemTestCase
  test "valid credentials" do
    user = create(:user)

    visit path_for(:frontend, "/")
    wait_for_pending_requests

    assert_selector "h1", text: "Sign in"

    fill_in "Email", with: user.email
    fill_in "Password", with: user.password
    click_on "Sign in"

    wait_for_pending_requests

    assert_selector "h1", text: "Dashboard"
  end

  test "invalid credentials" do
    user = create(:user)

    visit path_for(:frontend, "/")
    wait_for_pending_requests

    assert_selector "h1", text: "Sign in"

    fill_in "Email", with: user.email
    fill_in "Password", with: "wrong"
    click_on "Sign in"

    wait_for_pending_requests

    assert_text "Invalid password"
  end

  test "invalid user" do
    visit path_for(:frontend, "/")
    wait_for_pending_requests

    assert_selector "h1", text: "Sign in"

    fill_in "Email", with: "invalid"
    fill_in "Password", with: "invalid"
    click_on "Sign in"

    wait_for_pending_requests

    assert_text "User not found"
  end

  test "expired token" do
    user = create(:user)

    visit path_for(:frontend, "/")
    wait_for_pending_requests

    fill_in "Email", with: user.email
    fill_in "Password", with: user.password

    click_on "Sign in"
    wait_for_pending_requests

    assert_equal "/dashboard", page.current_path

    travel_to 1.day.from_now do
      visit path_for(:frontend, "/")
      wait_for_pending_requests

      sleep 1
    end

    assert_equal "/login", page.current_path
  end
end
