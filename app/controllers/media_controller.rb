class MediaController < ApplicationController
  def index
    @medias = Medium.all

    render :json => @medias
  end
end
