class NotificationService

  def self.notify_about_canceling_reservation(art_item_id)

  end


  def self.notify_author_about_reservation(art_item_id, customer_id)
    NotificationMailer.reservation_art_item_email(art_item_id, customer_id).deliver_now
  end

end