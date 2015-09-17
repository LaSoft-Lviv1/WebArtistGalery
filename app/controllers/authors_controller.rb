class AuthorsController < ApplicationController

  def index
    @authors = Author.all

    respond_to do |format|
      format.json { render json: @authors }
      format.html { render action: "index" }
    end
  end

  def new
    @author = Author.new
  end

  def create
    redirect_to '#/authors' #TODO What is it?
  end

  def destroy
    author = Author.find(params[:id])
    author.destroy

    redirect_to '#/authors' #TODO What is it?
  end

  def show
    @author = Author.find_by_id(params[:id])

    unless @author
      render :text => 'this artist is not available'
    end
  end

  private

  def author_params
    params.require(:author).permit(
                                    :first_name,
                                    :second_name,
                                    :info_about,
                                    :photo,
                                    :phone_number,
                                    :email_address,
                                    :city_id
                                   )
  end

end
