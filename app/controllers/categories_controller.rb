class CategoriesController < ApplicationController

  def index
    # @categories = Category.all
    # binding.pry
    @categories = Category.all
    render :json => @categories
    # binding.pry
  end
end
