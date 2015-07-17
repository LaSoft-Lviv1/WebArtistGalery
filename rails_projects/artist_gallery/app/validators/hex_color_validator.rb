class HexColorValidator < ActiveModel::EachValidator
  def validate_each(record, attribute, value)
    unless value =~ /\A([a-f0-9]{3}){,2}\z/i
      record.errors[attribute] << (options[:message] || 'is not a valid hex color value')
    end
  end
end

