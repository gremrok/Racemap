define(['collections/race', 'routers/router'], function (Races, router) {
    function getRacesFromCache() {
        var racesString = localStorage.getItem("races");
        if (!racesString) {
            getInitialData();
            racesString = localStorage.getItem("races");
        }
        return JSON.parse(racesString);
    };

    function getInitialData() {
        var races = {};

        localStorage.setItem('races', JSON.stringify(races));
    }

    var DataService = {
        getData: function () {
            //var races = getRacesFromCache();
            var races = [];
            //$.ajax({
            //    url: '/api/raceapi',
            //    method: 'GET',
            //    success: function(data) {
            //        races = data;
            //        app.races = new Races(races);
            //        router.start();
            //    }
            //});
            
            $.ajax({
                url: '/probeg.html',
                method: 'GET',
                success: function (data) {
                    var content = $(data);
                    var $rows = $('tr', content);
                    _.each($rows, function(item) {
                        var tds = $('td', $(item));
                        var race = {
                            name: tds[0].innerText,
                            month: tds[1].innerText,
                            place: tds[2].innerText,
                            country: tds[5].innerText
                        };
                        races.push(race);
                    });
                    var resps = [];
                    
                    var counter = 0;
                    var i = setInterval(function () {
                        // do your thing

                        counter++;
                        var race = races[counter];
                        var address = race.place.trim();
                        if (race.country.trim() !== '') {
                            address += ', ' + race.country.trim();
                        }
                        if (address !== ', ' && address !== '') {
                            $.ajax({
                                url: 'https://maps.googleapis.com/maps/api/geocode/json?address=' + encodeURIComponent(address),
                                success: function(resp) {
                                    if (resp.results.length > 0) {
                                        var lat = resp.results[0].geometry.location.lat;
                                        var lng = resp.results[0].geometry.location.lng;
                                        resps.push(resp);
                                    }
                                }
                            });
                        }
                        if (counter === races.length) {
                            clearInterval(i);
                            var q = resps;
                        }
                    }, 200);
                }
            });
            
        },
        saveData: function(){
            localStorage.setItem('races', JSON.stringify(races.toJSON()));
        }
    };

    return DataService;
});