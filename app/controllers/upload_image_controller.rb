class UploadImageController < ApplicationController
  def index
    @styles = Style.all
    @subjects = Subject.all
    @mediums = Medium.all
  end

  def show1
    @style = Style.find_by_id(params[:id])

    if @style.nil?
      @styles = Style.all
      @subjects = Subject.all
      @mediums = Medium.all

      render :action => :index, :alert => 'not found'
    end
  end

  def show
    @author = Author.find_by_id(params[:id])

    render :show
  end

end
