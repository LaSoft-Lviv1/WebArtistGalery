class ShoppingCartsController < ApplicationController
  # before_action :authenticate_user_from_token! #TODO this method must be rewritten (28.09.2015)
  respond_to :json

  DAYS_FOR_RESERVATION = 7

  def index
    # if LoginHelper::AuthenticationService.authenticate_user(params[:auth_token]).id == current_user.id
    if current_user
      @ordered_art_items = ShoppingCart.where("user_id = ? AND payment_date IS NULL", current_user.id)
      authorize @ordered_art_items
      # respond_to do |format|
      #   format.json { render json: @ordered_art_items }
      # end

      # render json: @ordered_art_items

      respond_with(@ordered_art_items)

    else
      redirect_to(:back)
    end
  end


  def create
    if current_user
      art_item_id = shopping_cart_params[:art_item_id]
      art_item = ShoppingCart.where(art_item_id: art_item_id).last
      # user_id = 2 #TODO delete when current_user is present
      user_id = current_user.id #TODO uncomment when current_user is present

      if art_item_sold? art_item
        render json: {success: false, message: "Art item is already sold"}
      elsif art_item_not_reserved? art_item
        ShoppingCart.create(art_item_id: art_item_id, user_id: user_id, order_date: Date.current, payment_date: nil)
        NotificationService.notify_author_about_reservation(art_item_id, user_id)
        render json: {success: true,
                      message: "Art item has been successfully reserved"}
      else
        ReservedShoppingCart.create(art_item_id: art_item_id, user_id: user_id, order_date: Date.current)
        render json: {success: false,
                      message: "Art item is already reserved. We will notify you, if it is removed from reservation"}
      end
    else
      render json: {success: false,
      				message: "You must be logged in to buy works of art"}
    end
    # NotificationService.canceling_reservation art_item_id

  end


  def destroy
    puts 'Some field has been updated'
    art_item=ShoppingCart.find(params[:id])
    NotificationService.canceling_reservation art_item.art_item_id
    art_item.destroy
  end


  private


  def art_item_sold?(art_item)
    if art_item
      art_item.payment_date
    else
      false
    end
  end


  def art_item_not_reserved?(art_item)
    if art_item
      Date.current - art_item.order_date.to_datetime > DAYS_FOR_RESERVATION
    else
      true
    end
  end

  # EXAMPLE
  # def art_item_not_reserved?(art_item)
  #   return Date.current - art_item.order_date.to_datetime > DAYS_FOR_RESERVATION if art_item
  #   true
  # end








  def shopping_cart_params
    params.require(:shopping_cart).permit(
                                          :art_item_id
                                         )
  end

end
