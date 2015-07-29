class CityController < ApplicationController

  def index
    #binding.pry
    @cities = City.all
    render :json => @cities
    #binding.pry
  end

end
