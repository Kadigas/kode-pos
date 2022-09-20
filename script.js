$(document).ready(function()
{
    $.ajaxSetup({ async: false, cache: false });

    function search()
    {
        var prov = $.trim($('#province').val()).toUpperCase();
        var city = $.trim($('#city').val()).toUpperCase();
        var subdst = $.trim($('#subdistrict').val()).toUpperCase();
        var sCount = 0;

        $('#result').remove();
        $('#container').append('<div id="result"></div>');

        var sDiv = $('#result');
        $(sDiv).append('<h2>SEARCH RESULT</h2>');
        $(sDiv).append('<p><span id="info"></span></p>');
        $(sDiv).append('<div id="card_container"></div>');

        var sCContainer = $('#card_container');

        $.getJSON("data.json", function(result)
        {
            $.each(result, function(key, val) {
                if(val.province.search(prov) !== -1 &&
                val.city.search(city) !== -1 &&
                val.sub_district.search(subdst) !== -1)
                {
                    var sCDiv = $('<div class="card"></div');
                    $(sCContainer).append(sCDiv);
                    $(sCDiv).append('<p>Province:</b> ' + val.province + '</p>');
                    $(sCDiv).append('<p>City:</b> ' + val.city + '</p>');
                    $(sCDiv).append('<p>Sub District:</b> ' + val.sub_district + '</p>');
                    $(sCDiv).append('<p>Urban:</b> ' + val.urban + '</p>');
                    $(sCDiv).append('<p>Postal Code:</b> ' + val.postal_code + '</p>');
                    sCount++;
                }
            });
        });
        
        if(sCount != 0)
        {
            $('#info').html('Data found: ' + sCount + ' data(s)');
        }
        
        else
        {
            $('#info').html('DATA NOT FOUND.');
        }
    }

    $('#sButton').click(function()
    {
        search();
    });
});