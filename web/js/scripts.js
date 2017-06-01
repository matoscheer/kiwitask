(function() {
    $.getJSON('https://api.skypicker.com/places?term=Brn&v=2&locale=en', function(places) {

        $.each(places, function(i){
            console.log(places[i].value);
            console.log(places[i]);
        });
    });

    $.getJSON('https://api.skypicker.com/flights?v=2&locale=en&flyFrom=prague_cz&to=paris_fr&dateFrom=18%2F08%2F2016&dateTo=18%2F08%2F2016&typeFlight=return&returnFrom=18%2F09%2F2016&returnTo=18%2F09%2F2016', function(data) {
        $.each(data, function(i){
            console.log(data[i]);
        });

    });




})();