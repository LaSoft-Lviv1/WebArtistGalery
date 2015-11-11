require 'faker'

FactoryGirl.define do
  factory :orientation do
    name {Faker::Lorem.word}
  end
end