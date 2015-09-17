json.array! @authors do |author|
  json.id author.id
  json.first_name author.first_name
  json.second_name author.second_name
  json.info_about author.info_about
  json.phone_number author.phone_number
  json.photo author.photo.url
  json.email_address author.email_address
  json.city_name author.city.name
  json.created_at author.created_at
  json.updated_at author.updated_at
end

