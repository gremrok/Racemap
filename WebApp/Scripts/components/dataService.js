define(['collections/race', 'routers/router'], function (Races, router) {
    function getRacesFromCache(useCache) {
        if (useCache) {
            var racesString = localStorage.getItem("races");
            if (!racesString) {
                getInitialData(function () {
                    getRacesFromCache(useCache);
                });
            }
            return JSON.parse(racesString);
        }
        getInitialData(function () {
            router.start();
            $.ajax({
                url: '/api/RaceApi/postRaces',
                method: 'POST',
                data: JSON.stringify({ '': app.races.toJSON() }),
                contentType: 'application/json',
                success: function (res) {
                    var x = res;
                },
                error: function (er) {
                    var f = er;
                }
            })
        });
    };

    function getInitialData(onSuccess) {
        $.ajax({
            url: '/api/raceapi/getRaces',
            method: 'GET',
            success: function (data) {
                app.races.reset(data);
                //localStorage.setItem('races', JSON.stringify(app.races));
                if (onSuccess) {
                    onSuccess();
                }
            }
        });
    }

    var DataService = {
        getData: function () {
            app.races = new Races();
            getRacesFromCache(false);
        },
        saveData: function(){
            localStorage.setItem('races', JSON.stringify(races.toJSON()));
        }
    };

    return DataService;
});