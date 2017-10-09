    $( document ).ready(function() 
    {
            var status = $('.notification-text').html();
            if(status=="")
            {
                $('.notifications').css('display',"none");
            }
             $('.bank-2').css('display',"none");
    });

    function display()
    {
        $('.bank-1').css('display',"none");
        $('.bank-2').css('display',"block");
        var bank=$('select[name=bank-name]').val();
        $("#account-number").text(bank);
    }

    function display_home()
    {
         $('.bank-2').css('display',"none");
         $('.bank-1').css('display',"block");
    }
    function accountnumber()
    {
         var bank=$('select[name=bank-name]').val();
         $("#account-number").text(bank);
    }
    function buttonenable()
    {
        var bank=$('select[name=bankname]').val();
        if(bank=='KVB')
        {
            $('#DepSlip').prop('disabled',false);
            $('#ALetter').prop('disabled',false);
        }
        if(bank=='SBI')
        {
           $('#DepSlip').prop('disabled',false);
            $('#ALetter').prop('disabled',false);
        }
        if(bank=='no')
        {
            $('#DepSlip').prop('disabled',true);
            $('#ALetter').prop('disabled',true);

        }
    }