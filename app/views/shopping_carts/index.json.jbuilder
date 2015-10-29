json.array! @ordered_art_items do |item|
  json.id item.id
  json.art_item_id item.art_item.id
  json.name item.art_item.name
  json.author_first_name item.art_item.author.first_name
  json.author_second_name item.art_item.author.second_name
  json.price item.art_item.price
  json.source_file item.art_item.source_file.url
  json.created_at item.art_item.created_at
  json.updated_at item.art_item.updated_at
end