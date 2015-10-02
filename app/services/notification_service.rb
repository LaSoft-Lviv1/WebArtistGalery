class NotificationService

  def self.notify_about_canceling_reservation(art_item_id)
    @art_item = ArtItem.find(art_item_id)
    # @author = User.find(@art_item.author.user_id)
    @author = @art_item.author
    # @customers = ReservedShoppingCart.find_by_art_item_id(art_item_id)
    # @customers.each do |customer|
    #   NotificationMailer.deliver_canceling_reservation_email(@art_item, @author, customer)

    ReservedShoppingCart.where(art_item_id: art_item_id).find_each do |customer|
      #NotificationMailer.deliver_canceling_reservation_email(@art_item, @author, customer)
      NotificationMailer.canceling_reservation_email(@art_item, @author, customer.user).deliver_now
    end

  end


  def self.notify_author_about_reservation(art_item_id, customer_id)
    @art_item = ArtItem.find(art_item_id)
    @customer = Customer.find_by_user_id(customer_id)
    @author = User.find(@art_item.author.user_id)
    NotificationMailer.reservation_art_item_email(@art_item, @author, @customer).deliver_now
  end

end