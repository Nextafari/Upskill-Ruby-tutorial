class PagesController < ApplicationController
# GET request to our homepage
    def home
        @basic_plan = Plan.find(1)
        @pro_plan = Plan.find(2)
    end
    
# GET request to our About page
    def about
    end
end