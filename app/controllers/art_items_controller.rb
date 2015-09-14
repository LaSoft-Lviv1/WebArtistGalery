class ArtItemsController < ApplicationController

  def index
    @art_items = ArtItem.all
    @sorted_art_items = @art_items.sort_by { |obj| obj.created_at }
    puts 'from fetch'
    puts
    puts
    puts
    puts
    puts
    puts
    puts params[:great]
    #binding.pry
    respond_to do |format|
       format.json { render json: @sorted_art_items.reverse }
       format.html { render action: "index" }
      end
    #render json: @art_items
    #render html: "art_items"

  end


  def new
    @art_item = ArtItem.new

  end


  def create

    @art_item = ArtItem.new(art_item_params)
    # binding.pry
    @art_item.save
    # binding.pry


    if @art_item.errors.empty?
      redirect_to :art_items
    else
      render "new"
    end

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

  # def upload
  #   require.pry
  #   uploaded_io = params[:art_item][:source_file]
  #   #uploaded_io = params[:art_items][:preview_source_file]
  #   File.open(Rails.root.join('public', 'uploads', uploaded_io.original_filename), 'w') do |file|
  #     file.write(uploaded_io.read)
  #   end
  # end

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