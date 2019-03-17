
(function ($) {
    "use strict";

    /*==================================================================
    [ Validate after type ]*/
    $('.validate-input .input100').each(function(){
        $(this).on('blur', function(){
            if(validate(this) == false){
                showValidate(this);
            }
            else {
                $(this).parent().addClass('true-validate');
            }
        })
    })


    /*==================================================================
    [ Validate ]*/
    var input = $('.validate-input .input100');
    var phoneinput = $('.phoneNumber-Validate');
    $('.validate-form').on('submit',function(){
        var check = true;

        for(var i=0; i<input.length; i++) {
            if(validate(input[i]) == false){
                showValidate(input[i]);
                //validatePhone(phoneinput[i]);
                check=false;
            }
        }

        return check;
    });


    $('.validate-form .input100').each(function(){
        $(this).focus(function(){
           hideValidate(this);
           $(this).parent().removeClass('true-validate');
        });
    });

var phoneno = /^\(?([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$/;
var email = /^[A-Z0-9._%+-]+@([A-Z0-9-]+\.)+[A-Z]{2,4}$/i;
//|| $(input).attr('name') == 'email' || $(input).attr('name') == 'phone'
     function validate (input) {
        if($(input).attr('type') == 'text') {
            if(($(input).val().trim().match(/^([a-zA-Z0-9_\-\.]+)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([a-zA-Z0-9\-]+\.)+))([a-zA-Z]{1,5}|[0-9]{1,3})(\]?)$/) == null)) {
                return false;
            }
        }
        // if($(input).attr('name') == 'email') {
        //     if(email.test($(input).val().trim())) {
        //         return false;
        //     }

        else {
            if($(input).val().trim() == ''){
                return false;
            }
        }
    }



    function showValidate(input) {
        var thisAlert = $(input).parent();

        $(thisAlert).addClass('alert-validate');

        $(thisAlert).append('<span class="btn-hide-validate">&#xf135;</span>')
        $('.btn-hide-validate').each(function(){
            $(this).on('click',function(){
               hideValidate(this);
            });
        });
    }

    function hideValidate(input) {
        var thisAlert = $(input).parent();
        $(thisAlert).removeClass('alert-validate');
        $(thisAlert).find('.btn-hide-validate').remove();
    }



})(jQuery);
