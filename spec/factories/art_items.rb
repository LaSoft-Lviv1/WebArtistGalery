require 'faker'

FactoryGirl.define do
  factory :art_item do
    name {Faker::Lorem.word}
    description {Faker::Lorem.paragraph}
    price {Faker::Number.number(4)}
    vertical_size {Faker::Number.number(4)}
    horizontal_size {Faker::Number.number(4)}
    keywords {Faker::Lorem.word}
    colors { |c| [c.association(:color)] }
    style
    media
    category
    orientation
    subject
    author
  end
end