$( document ).ready(function() {

    $('#from_place_input, #to_place_input').on('keypress', function () {

        var target = $(this).next('.select-field');
        target.show();
        loadOptions($(this).val(), target);
        loadOptions($(this).val(), target);
    });

    $('#one_way_form').submit(function (e) {

        var submitUrl = 'https://api.skypicker.com/flights';
        var formData = {
            flyFrom: $('#from_place_select').val(),
            to: $('#to_place_select').val(),
            dateFrom: $('#departure_from').val(),
            dateTo: $('#departure_to').val(),
            v: '2',
            locale: 'en',
            typeFlight: 'oneway'
        };

        $.ajax({
            type: "GET",
            url: submitUrl,
            data: formData,
            success: successCallback
        });

        e.preventDefault();
        return false;

    });

});


function successCallback(data) {

    $('#results').empty();
    $('.js-hidden').hide();

    var template = $('#template').html();
    Mustache.parse(template);

    for (i = 0; i < Math.min(20, data['data'].length); i++) {
        var searchResult = data['data'][i];

        var dTimestamp = searchResult['dTime'];
        var aTimestamp = searchResult['aTime'];

        var dDateTime = moment(dTimestamp , 'X');
        var aDateTime = moment(aTimestamp , 'X');


        var dTime = dDateTime.format("HH:MM");
        var dDate = dDateTime.format("DD.MM.YYYY");
        var aTime = aDateTime.format("HH:MM");
        var aDate = aDateTime.format("DD.MM.YYYY");


        var vars = {
            cityFrom: searchResult['cityFrom'],
            cityTo: searchResult['cityTo'],
            flyFrom: searchResult['flyFrom'],
            flyTo: searchResult['flyTo'],
            fly_duration: searchResult['fly_duration'],
            distance: searchResult['distance'],
            price: searchResult['price'],
            airlines: searchResult['airlines'][0],
            dTime: dTime,
            dDate: dDate,
            aTime: aTime,
            aDate: aDate
        };
        var rendered = Mustache.render(template,vars);
        $('#results').append(rendered);

    }
    $('#results').show();
}

function loadOptions(searchTerm, target) {

    var dataUrl = 'https://api.skypicker.com/places?term=' + searchTerm + '&v=2&locale=en';

    $.getJSON( dataUrl, function( data ) {

        var items = [];
        $.each( data, function( i, val ) {
            items.push( "<option value='" + val.id + "'>" + val.value + "</option>" );
        });

        $(target).html(items.join(''));
    });

}