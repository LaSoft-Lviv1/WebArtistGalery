class ArtItemsController < ApplicationController

  def index
    @art_items = ArtItem.all
    @sorted_art_items = @art_items.sort_by { |obj| obj.created_at }

    respond_to do |format|
      format.json { render json: @sorted_art_items.reverse }
      format.html { render action: 'index' } #TODO What is it?
    end
  end


  def new
    @art_item = ArtItem.new
  end


  def create
    @art_item = ArtItem.new(art_item_params)
    @art_item.save

    if @art_item.errors.empty?
      redirect_to :art_items
    else
      render "new"
    end
  end

  private

  def art_item_params
    params.require(:art_item).permit(:name,
                                   :description,
                                   :price,
                                   :keywords,
                                   :style_id,
                                   :media_id,
                                   :orientation_id,
                                   :subject_id,
                                   :category_id,
                                   :author_id,
                                   :vertical_size,
                                   :horizontal_size,
                                   :source_file,
                                   :preview_source_file)
  end

end