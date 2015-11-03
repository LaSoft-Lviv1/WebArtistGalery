require 'faker'

FactoryGirl.define do
  factory :user do |u|
    u.email { Faker::Internet.email }
    u.password { '12345678' }
    u.password_confirmation {'12345678'}
    role {'customer'}

    trait :customer do
      role {'customer'}
    end

    trait :artist do
      role {'artist'}
    end

    trait :admin do
      role {'admin'}
    end
  end
end

