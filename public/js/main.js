$(document).ready(function() {
    var CSRF_HEADER = 'X-CSRF-Token';
    var token = $('meta[name="csrf-token"]').attr('content');

    var address = $('#address');

    // Place JavaScript code here...

    $.ajaxPrefilter(function(options, _, xhr) {
        xhr.setRequestHeader(CSRF_HEADER, token);
    });

    address.change(get_areas);

    function get_areas() {
        var address = $('#address').val();
        setTimeout(function() {

            $.ajax({
                type: 'POST',
                url: '/get/areas',
                data: { address: address },
                success: function(response) {

                    while (select.hasChildNodes())
                        select.removeChild(select.lastChild);

                    if (city === response.currentCity) {
                        var _option = document.createElement('option');
                        _option.selected = 'selected';
                        _option.textContent = response.currentArea;
                        select.appendChild(_option);
                    }
                    for (var i = 0; i < response.area.length; i++) {
                        var option = document.createElement('option');
                        option.textContent = response.area[i];
                        select.appendChild(option);
                    }
                }
            })

        }, 100)

    }

    address.trigger('change');

});