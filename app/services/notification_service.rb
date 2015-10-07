class NotificationService

  def self.canceling_reservation(art_item_id)
    # @art_item = ArtItem.find(art_item_id)
    # @author = @art_item.author
    self.initialize_data art_item_id
    ReservedShoppingCart.where(art_item_id: art_item_id).find_each do |customer|
      #NotificationMailer.deliver_canceling_reservation_email(@art_item, @author, customer)
      NotificationMailer.canceling_reservation_email(customer.user.email, @art_item, @author, customer.user).deliver_now \
      if @author && @customer
    end

  end


  def self.notify_author_about_reservation(art_item_id, customer_id)
    self.initialize_data(art_item_id, customer_id)
    @email = User.find(@art_item.author.id).email
    NotificationMailer.reservation_art_item_email(@email, @art_item, @author, @customer).deliver_now if @author && @customer
  end

  private

  def self.initialize_data(art_item_id, customer_id=nil)
    @art_item = ArtItem.find(art_item_id)
    @author = @art_item.author
    @customer = Customer.find_by_user_id(customer_id) if customer_id
  end

end