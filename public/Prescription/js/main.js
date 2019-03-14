
(function ($) {
    "use strict";


    /*==================================================================
    [ Focus input ]*/
    $('.input100').each(function(){
        $(this).on('blur', function(){
            if($(this).val().trim() != "") {
                $(this).addClass('has-val');
            }
            else {
                $(this).removeClass('has-val');
            }
        })
    })


    /*==================================================================
    [ Validate ]*/
    var input = $('.validate-input .input100');

    $('.validate-form').on('click',function(){
        var check = true;

        for(var i=0; i<input.length; i++) {
            if(validate(input[i]) == false){
                showValidate(input[i]);
                check=false;
            }
        }

        return check;
    });


    $('.validate-form .input100').each(function(){
        $(this).focus(function(){
           hideValidate(this);
        });
    });

    function validate (input) {

      if($(input).attr('name') == 'email') {
        if($(input).val().trim().match(/^[a-zA-Z_]*$/) == null) {
          return false; }
        } // if the input is medicine Name validatable fields

      else if($(input).attr('name') == 'doze' || $(input).attr('name') == 'frequency' || $(input).attr('name') == 'Quantity') {
             if($(input).val().trim().match(/^[a-zA-Z0-9]*$/) == null) {
               return false; }
             } // if the input is one of the 3 validatable fields
          else {
            if($(input).val().trim() == ''){
            return false; }
          }
        }

    // function validate (input) {
    //     if($(input).attr('name') == 'doze' || $(input).attr('name') == 'email' || $(input).attr('name') == 'frequency' || $(input).attr('name') == 'Quantity') {
    //         // if($(input).val().trim().match( /^([a-zA-Z0-9_\-\.]+)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([a-zA-Z0-9\-]+\.)+))([a-zA-Z]{1,5}|[0-9]{1,3})(\]?)$/ ) == null) {
    //         if($(input).val().trim().match(/^[a-zA-Z_]*$/) == null) {
    //             return false;
    //         }
    //     } // if the input is one of the 4 validtable fields
    //     else {
    //         if($(input).val().trim() == ''){
    //             return false;
    //         }
    //     }
    // }

    function showValidate(input) {
        var thisAlert = $(input).parent();

        $(thisAlert).addClass('alert-validate');
    }

    function hideValidate(input) {
        var thisAlert = $(input).parent();

        $(thisAlert).removeClass('alert-validate');
    }

})(jQuery);
