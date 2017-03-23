$(document).ready(function() {
    var CSRF_HEADER = 'X-CSRF-Token';
    var token = $('meta[name="csrf-token"]').attr('content');

    var address = $('#address');

    // Place JavaScript code here...
    var containerArray = $('.values');
    $('#enterAddress').keyup(function(event) {
        var enteredText = $("#enterAddress").val();
        var valueContainerArray = document.getElementsByClassName('value-container');
        var addressArray = $(".val-address");
        for (var i = 0; i < addressArray.length; i++) {
            var superString = addressArray[i].innerHTML;
            if (superString.search(enteredText) !== -1) {
                containerArray[i].style.display = "block";
            } else {
                containerArray[i].style.display = "none";
            }
        }
        for (var j = 0; j < valueContainerArray.length; j++) {
            var valueArray = valueContainerArray[j].getElementsByClassName('values');
            var y = 0;
            for (k = 0; k < valueArray.length; k++) {
                if (valueArray[k].style.display == "block") {
                    y = 1;
                    break;
                }
            }
            if (y == 0) {
                valueContainerArray[j].style.display = "none";
            } else {
                valueContainerArray[j].style.display = "block";
            }
        }
    });

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