
class AuthorsController < ApplicationController

  def index
    @authors = Author.all
    render json: @authors
  end


  def new
    @author = Author.new

  end


  def create
    a = Author.create(author_params)
    redirect_to :authors
    #redirect_to :author

  end


  def edit

  end


  def update

  end


  def destroy

  end


  def show
    @author = Author.find_by_id(params[:id])
    unless @author
      render :text => 'this artist is not available'
    end


  end

  private

  def upload
    uploaded_io = params[:author][:photo]
    File.open(Rails.root.join('public', 'uploads', uploaded_io.original_filename), 'w') do |file|
      file.write(uploaded_io.read)
    end
  end


  def author_params
    params.require(:author).permit(:first_name,
                                   :second_name,
                                   :info_about,
                                   :photo,
                                   :phone_number,
                                   :email_address,
                                   :city_id)
  end


end
