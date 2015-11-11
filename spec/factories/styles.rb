require 'faker'

FactoryGirl.define do
  factory :style do
    name {Faker::Lorem.word}
  end
end