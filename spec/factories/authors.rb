require 'faker'

FactoryGirl.define do
  factory :author do
    first_name { Faker::Name.first_name }
    second_name { Faker::Name.last_name }
    phone_number { Faker::PhoneNumber.phone_number }
    user_id { FactoryGirl.create(:user, :artist).id }
    city_id { FactoryGirl.create(:city) }
  end
end