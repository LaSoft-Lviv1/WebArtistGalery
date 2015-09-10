class OrientationsController < ApplicationController

  def index
    @orientations = Orientation.all
    render :json => @orientations
    # binding.pry
  end

end
