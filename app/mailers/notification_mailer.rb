class NotificationMailer < ApplicationMailer

  # def welcome_email(user)
  #   # @user = user
  #   @url  = 'http://example.com/login'
  #   mail(to: 'ogrlen@ukr.net', subject: 'Welcome to My Awesome Site')
  # end


  def reservation_art_item_email(art_item_id, customer_id)
    @art_item = ArtItem.find(art_item_id)
    @customer = Customer.find_by_user_id(customer_id)
    @author = User.find(@art_item.author.user_id)
    attachments.inline['image.jpg'] = File.read(@art_item.source_file.file.path)
    # attachments.inline['image.jpg'] = File.read("/home/helen/Pictures/images.jpeg")
    mail(to: @author.email, subject: 'Reservation your picture')
    # binding.pry
  end

end
