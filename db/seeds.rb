# ORIENTATION
['square', 'portrait', 'landscape'].each do |orientation|
	Orientation.create(name: orientation)
end


# CATEGORIES
categories = %w[Paintings Photography Drawing Sculpture Collage Prints]

categories.each do |category|
  Category.create(name: category)
end


# SUBJECTS
subjects = ['Animal','Architecture','Bike','Body','Cats','Dogs','Cities','Food','Garden','Home','People','Sports']

subjects.each do |subject|
  Subject.create(name: subject)
end


# STYLES
styles = ['Pop Art','Realism','Street Art','Modern','Surrealism','Folk','Documentary','Abstract']

styles.each do |style|
  Style.create(name: style)
end


# MEDIA
mediums = %w[Acrylic Oil Tempera Watercolor Ink Airbrush]

mediums.each do |medium|
  Medium.create(name: medium)
end


# CITIES
cities = %w[Lviv Kyiv London]

cities.each do |city|
  City.create(name: city)
end