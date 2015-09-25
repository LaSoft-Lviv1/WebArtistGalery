class ShoppingCartsController < ApplicationController

  def index
    # redirect_to :back unless current_user
    # @ordered_art_items =  ShoppingCart.where("user_id = ? AND payment_date IS NULL", current_user.id).all
    if current_user
      # puts "\n current user = #{current_user.id} \n\n"
      @ordered_art_items =  ShoppingCart.where("user_id = ? AND payment_date IS NULL", current_user.id).all
    else
      # puts "=============================request.referer #{request.referer}====================="
      # puts "=============================request.fullpath #{request.fullpath}====================="
      # puts "=============================request.original_url #{request.original_url}====================="
      # puts "=============================request.uri #{request.headers['HTTP_REFERER']}====================="
      redirect_to(:back)
    end
  end

  def create
    puts "+++++++++++++++++++++++++++++++++"
    puts "======================id====== #{params.require(:shopping_cart).permit(:art_item_id)[:art_item_id]}============================"
    puts "+++++++++++++++++++++++++++++++++"
    # redirect_to :shopping_carts
    redirect_to :back
  end

end
