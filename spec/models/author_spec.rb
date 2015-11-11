require 'rails_helper'

RSpec.describe Author, type: :model do

  before(:each) do
    @author = FactoryGirl.build(:author)
    puts  @author.user_id
  end

  subject { @author }

  # it "has a valid factory" do
  #   # author = FactoryGirl.build(:author)
  #   expect(@author).to be_valid
  # end

  it { should be_valid }


  # it "is invalid without a firstname"
  # it "is invalid without a lastname"

  context "associations" do
    it { should belong_to :user }
    it { should belong_to :city }
    it { should have_many :art_items }
  end

  it { should respond_to :first_name }
  it { should respond_to :second_name }
  it { should respond_to :user_id }
  it { should respond_to :photo }
  it { should respond_to :info_about }
  it { should respond_to :phone_number }
  it { should respond_to :city_id }
  it { should validate_presence_of :phone_number }
  it { should validate_presence_of :second_name }
  it { should validate_presence_of :user_id }

end