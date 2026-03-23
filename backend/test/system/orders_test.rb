# frozen_string_literal: true

require "application_system_test_case"

class OrdersTest < ApplicationSystemTestCase
  test "create" do
    user = create(:user)

    sign_in(user)

    visit path_for(:frontend, "/orders")
    wait_for_pending_requests

    click_on "Add order"

    within ".ant-drawer" do
      fill_in "Customer name", with: "John Doe"
      within ".ant-form-item", text: "Status" do
        fill_in_select with: "Delivered"
      end
      fill_in "Address", with: "123 Main St"
      fill_in "Shipping fee", with: 10
      fill_in "Subtotal", with: 100
      fill_in "Tax", with: 10
      fill_in "Total", with: 110
      fill_in "Currency", with: "USD"

      click_on "Submit"

      wait_for_pending_requests
    end

    assert_attributes Order.last!,
                      address: "123 Main St",
                      currency: "USD",
                      customer_name: "John Doe",
                      shipping_fee: 10,
                      status: "delivered",
                      subtotal: 100,
                      tax: 10,
                      total: 110
  end

  test "delete" do
    user = create(:user)

    sign_in(user)

    order = create(:order)

    sign_in(user)

    visit path_for(:frontend, "/orders")
    wait_for_pending_requests

    assert_text order.customer_name

    within "tr", text: order.customer_name do
      click_on "Delete"
    end

    within ".ant-popover" do
      click_on "OK"
      wait_for_pending_requests
    end

    assert_equal 0, Order.count
    assert_no_text order.customer_name
  end

  test "update" do
    user = create(:user)

    order = create(:order)

    sign_in(user)

    visit path_for(:frontend, "/orders")
    wait_for_pending_requests

    assert_text order.customer_name

    within "tr", text: order.customer_name do
      click_on "Edit"
    end

    within ".ant-drawer" do
      fill_in "Customer name", with: "John Doe"
      within ".ant-form-item", text: "Status" do
        fill_in_select with: "Delivered"
      end
      fill_in "Address", with: "123 Main St"
      fill_in "Shipping fee", with: 10
      fill_in "Subtotal", with: 100
      fill_in "Tax", with: 10
      fill_in "Total", with: 110
      fill_in "Currency", with: "USD"

      click_on "Submit"

      wait_for_pending_requests
    end

    assert_attributes order.reload,
                      address: "123 Main St",
                      currency: "USD",
                      customer_name: "John Doe",
                      shipping_fee: 10,
                      status: "delivered",
                      subtotal: 100,
                      tax: 10,
                      total: 110
  end
end
