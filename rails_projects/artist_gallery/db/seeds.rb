# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rake db:seed (or created alongside the db with db:setup).
#
# Examples:
#
#   cities = City.create([{ name: 'Chicago' }, { name: 'Copenhagen' }])
#   Mayor.create(name: 'Emanuel', city: cities.first)
orient1 = Orientation.new
orient1.name='square'
orient1.save

orient2 = Orientation.new
orient2.name='portrait'
orient2.save

orient3 = Orientation.new
orient3.name='landscape'
orient3.save

orient4 = Orientation.new
orient4.name='test'
orient4.save

categories = %w[Paintings Photography Drawing Sculpture Collage Prints]

categories.each do |c|
  Category.create(name: c)
end


subjects = ['Animal','Architecture','Bike','Body','Cats','Dogs','Cities','Food','Garden','Home','People','Sports']

subjects.each do |c|
  Subject.create(name: c)
end

styles = ['Pop Art','Realism','Street Art','Modern','Surrealism','Folk','Documentary','Abstract']

styles.each do |s|
  Style.create(name: s)
end

mediums = %w[Acrylic Oil Tempera Watercolor Ink Airbrush]

mediums.each do |m|
  Medium.create(name: m)
end

cities = %w[Lviv Kyiv London]

cities.each do |c|
  City.create(name: c)
end