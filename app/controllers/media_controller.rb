class MediaController < ApplicationController

  def index
    @medias = Medium.all
    render :json => @medias
    # binding.pry
  end

end
