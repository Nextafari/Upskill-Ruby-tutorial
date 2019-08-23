class ContactsController < ApplicationController
  
  #GET request to /contact-us
  #Show new contact form
  def new
    @contact = Contact.new
  end
  
  #POST request to /contact
  def create
    #Mass assignment of form fields(name, email, comment) into contact object
    @contact = Contact.new(contact_params)
   #Save the contact object into the database
    if @contact.save
     #Store form fields via parameters, into variables(name, email, body) 
      name = params[:contact][:name]
      email = params[:contact][:email]
      body = params[:contact][:comments]
      #Plug variables into Contact Mailer email method and send email
      ContactMailer.contact_email(name, email, body).deliver
      #Displays flash message "message sent" to the user 
      #after a successful save of the object 
      #and redirects to the empty form page
      flash[:success] = "Message sent."
       redirect_to new_contact_path
    else
      #If the Contact object does not save
      #Display flash message "error" and redirect to the new empty form page
      flash[:danger] = @contact.errors.full_messages.join(", ")
       redirect_to new_contact_path
    end
  end
 
  private
  #To collect data from forms, we need to use these 
  #parameters and whitelist the form fields, 
  #this is some sort of security feature in rails
    def contact_params
       params.require(:contact).permit(:name, :email, :comments)
    end
end