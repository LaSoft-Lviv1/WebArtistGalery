class ArtItemsController < ApplicationController

  def index
    @art_items = ArtItem.all
  end


  def new

    @art_item = ArtItem.new


  end


  def create
    require 'pry'
    data = Date.current
    #@art_item.in_date = data
    @art_item_create = ArtItem.create(art_item_params)
    redirect_to :art_items
  end


  def edit

  end


  def update

  end


  def destroy

  end


  def show

  end


  private

  def upload
    require.pry
    uploaded_io = params[:art_items][:source_file]
    #uploaded_io = params[:art_items][:preview_source_file]
    File.open(Rails.root.join('public', 'uploads', uploaded_io.original_filename), 'w') do |file|
      file.write(uploaded_io.read)
    end
  end

  def art_item_params
    params.require(:art_items).permit(:name,
                                   :description,
                                   :price,
                                   :keywords,
                                   :style_id,
                                   :media_id,
                                   :orientation_id,
                                   :subject_id,
                                   :category_id,
                                   :author_id,
                                   :source_file,
                                   :preview_source_file )
  end


end
