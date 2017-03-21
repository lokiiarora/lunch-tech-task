$(document).ready(function() {
    var CSRF_HEADER = 'X-CSRF-Token';
    var token = $('meta[name="csrf-token"]').attr('content');

    var city = $('#city');
    var select = document.getElementById('area');

    // Place JavaScript code here...

    $.ajaxPrefilter(function (options, _, xhr) {
        xhr.setRequestHeader(CSRF_HEADER, token);
    });

    city.change(get_areas);

    function get_areas(){
        var city = $('#city').val();
        var area = $('#area > option').val();
        setTimeout(function(){

            $.ajax({
                type: 'POST',
                url: '/get/areas',
                data: {city:city},
                success: function(response){

                    while(select.hasChildNodes())
                        select.removeChild(select.lastChild);

                    if(city === response.currentCity){
                        var _option = document.createElement('option');
                        _option.selected = 'selected';
                        _option.textContent = response.currentArea;
                        select.appendChild(_option);
                    }
                    for(var i=0;i<response.area.length;i++){
                        var option = document.createElement('option');
                        option.textContent = response.area[i];
                        select.appendChild( option );
                    }
                }
            })

        },100)

    }

    city.trigger('change');

});

