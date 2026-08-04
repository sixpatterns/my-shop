# frozen_string_literal: true

require "application_system_test_case"

class CustomersTest < ApplicationSystemTestCase
  test "create" do
    user = create(:user)

    sign_in(user)

    visit path_for(:frontend, "/customers")
    wait_for_pending_requests

    click_on "Add customer"

    within ".ant-drawer" do
      fill_in "Name", with: "John Doe"
      fill_in "Email", with: "john@example.com"
      fill_in "Phone", with: "555-0100"

      click_on "Submit"

      wait_for_pending_requests
    end

    assert_attributes Customer.last!,
                      email: "john@example.com",
                      name: "John Doe",
                      phone: "555-0100"
  end

  test "delete" do
    user = create(:user)
    customer = create(:customer)

    sign_in(user)

    visit path_for(:frontend, "/customers")
    wait_for_pending_requests

    assert_text customer.name

    within "tr", text: customer.name do
      click_on "Delete"
    end

    within ".ant-popover" do
      click_on "OK"
      wait_for_pending_requests
    end

    assert_equal 0, Customer.count
    assert_no_text customer.name
  end

  test "update" do
    user = create(:user)
    customer = create(:customer)

    sign_in(user)

    visit path_for(:frontend, "/customers")
    wait_for_pending_requests

    assert_text customer.name

    within "tr", text: customer.name do
      click_on "Edit"
    end

    within ".ant-drawer" do
      fill_in "Name", with: "John Doe"
      fill_in "Email", with: "john@example.com"
      fill_in "Phone", with: "555-0100"

      click_on "Submit"

      wait_for_pending_requests
    end

    assert_attributes customer.reload,
                      email: "john@example.com",
                      name: "John Doe",
                      phone: "555-0100"
  end
end
