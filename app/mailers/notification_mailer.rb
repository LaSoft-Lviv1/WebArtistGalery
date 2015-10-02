class NotificationMailer < ApplicationMailer

  # def welcome_email(user)
  #   # @user = user
  #   @url  = 'http://example.com/login'
  #   mail(to: 'ogrlen@ukr.net', subject: 'Welcome to My Awesome Site')
  # end

  def canceling_reservation_email(art_item, author, user)
    if user
      @art_item = art_item
      @user = user
      @author = author
      @customer_name = Customer.find_by_user_id(user.id).name
      attachments.inline['image.jpg'] = File.read(@art_item.source_file.file.path)
      mail(to: @user.email, subject: 'Picture was canceled from reservation')
    end
  end

  def reservation_art_item_email1(art_item_id, customer_id)
    @art_item = ArtItem.find(art_item_id)
    @customer = Customer.find_by_user_id(customer_id)
    @author = User.find(@art_item.author.user_id)
    attachments.inline['image'] = File.read(@art_item.source_file.file.path)
    mail(to: @author.email, subject: 'Reservation your picture')
  end

  def reservation_art_item_email(art_item, author, customer)
    @art_item = art_item
    @customer = customer
    @author = author
    attachments.inline['image'] = File.read(@art_item.source_file.file.path)
    mail(to: @author.email, subject: 'Reservation your picture')
  end

end
