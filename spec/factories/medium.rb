require 'faker'

FactoryGirl.define do
  factory :media do
    name {Faker::Lorem.word}
  end
end