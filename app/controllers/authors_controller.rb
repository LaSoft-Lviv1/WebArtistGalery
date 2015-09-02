
class AuthorsController < ApplicationController

  #respond_to :json

  def index
    @authors = Author.all
    #render json: @authors

    #respond_with(@authors)

  end


  def new
    @author = Author.new

  end


  def create
    # binding.pry
    puts author_params
    @a = Author.create(author_params)
    #render json: @a
    redirect_to '#/authors'
    #redirect_to :author

  end


  def edit

  end


  def update

  end


  def destroy
    #binding.pry
    author = Author.find(params[:id])
    #binding.pry
    author.destroy
    redirect_to '#/authors'
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
