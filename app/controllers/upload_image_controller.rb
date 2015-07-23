class UploadImageController < ApplicationController

  def index
    @styles = Style.all
    #@styles = [Style.new(name: 'st1'), Style.new(name: 'st2')]

    @subjects = Subject.all

    @mediums = Medium.all



   # render  :layout => true, :text => 'text'
    #  render :text => 'ok'
    #render :json => @styles.first
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
