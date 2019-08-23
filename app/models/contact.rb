class Contact < ActiveRecord::Base
  #contact form validations 
  #(helps make sure the user fills out the whole form fields
  #for the contact form object to save)
  validates :name, presence: true
  validates :email, presence: true
  validates :comments, presence: true
end 