require 'rails_helper'

RSpec.describe ShoppingCartsController, type: :controller do

  before (:each) do
    @user = FactoryGirl.create(:user)
    sign_in @user
  end

  describe "GET #index" do
    context ""
    it "returns http success" do
      puts @user.inspect
      get :index
      expect(response).to have_http_status(:success)
    end
  end

end
