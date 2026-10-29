# frozen_string_literal: true

module SessionsHelper
  def sign_in(user)
    hash = { state: { session: { fullName: user.full_name, token: Session.token(user) } }, version: 0 }

    visit admin_url("/")
    page.execute_script "window.localStorage.setItem('session-store', arguments[0]);", hash.to_json
  end
end
