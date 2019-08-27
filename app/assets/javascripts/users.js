/* global $, Stripe */
//Document ready.
$(document).on("turbolinks:load", function(){
    var theForm = $('#pro_form');
    var submitBtn = $('#form-signup-btn');
  
  //Set Stripe public key.
  Stripe.setPublishableKey($('meta[name="stripe_key"]').attr('content') );
  
  //When user clicks form submit btn.
  submitBtn.click(function(event){
    //Prevent default submission behavior.
    event.preventDefault();
    submitBtn.val("processing").prop('disabled', true);
    
    //Collect the credit card fields.
    var ccNum = $('#card_number').val(),
        cvcNum = $('#card_code').val(),
        expMonth = $('#card_month').val(),
        expYear = $('#card_year').val();
    
    //Use Stirpe JS library to check for errors on the card
    var error = false;
    
    //Validate card number
    if (!Stripe.card.validateCardNumber(ccNum)) {
      error = true;
      alert('The card number appears to be invalid');
    }
    
    //Validate card security number (CVC)
    if (!Stripe.card.validateCVC(cvcNum)) {
      error = true;
      alert('The CVC number appears to be invalid');
    }
    
    //Validate card expiration details
    if (!Stripe.card.validateExpiry(expMonth, expYear)) {
      error = true;
      alert('The expiration date appears to be invalid');
    }
    
    if (error) {
      //If there are card errors don't send to Stripe
      submitBtn.prop('disabled', false).val("Sign Up");
    } else {
      //Send the card info to Stripe.
      Stripe.createToken({
        number: ccNum,
        cvc: cvcNum,
        exp_month: expMonth,
        exp_year: expYear
      }, stripeResponseHandler);
    }
    
    return false;
  });
  
  //Stripe will return a card token.
  function stripeResponseHandler(status, response) {
    var token = response.id;
  
  //Inject card token as hidden field into form.
    theForm.append( $('<input type="hidden" name="user[stripe_card_token]">').val(token) );
  
  //Submit form to our rais app
  theForm.get(0).submit();
  }
  
});