class StylesController < ApplicationController

  def index
    @styles = Style.all
    render :json => @styles
    # binding.pry
  end

end
