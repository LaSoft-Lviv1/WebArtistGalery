require 'faker'

FactoryGirl.define do
  factory :color do
    name {Faker::Commerce.color}
    hex_name {Faker::Lorem.word}
    percentage {Faker::Number.number(4)}
  end
end