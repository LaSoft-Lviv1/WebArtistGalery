class AuthorsController < ApplicationController
  before_action :authenticate_user_from_token!, except: [:index, :show]

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

  def update
    @author = Author.find(params[:id])
    authorize @author
    if @author.update_attributes(author_params)
      render status: 200, json: { message: 'ok'}
    else
      render status: 400, json: { message: 'error'}
    end
  end

  def destroy
    author = Author.find(params[:id])
    author.destroy

    redirect_to '#/authors' #TODO What is it?
  end

  def show
    id = params[:id].presence
    @author = Author.find_by(id: id)
    if @author
      respond_to do |format|
        format.json { render json: @author }
        format.html { render action: "index" }
      end
    else
      render status: 400, json: { message: 'Author hasn\'t been found.' }
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
                                    :city_id
                                   )
  end

end
