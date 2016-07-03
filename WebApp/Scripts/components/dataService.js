define(['collections/race', 'routers/router'], function (Races, router) {
    function getInitialData(onSuccess) {
        $.ajax({
            url: '/api/raceapi/getRaces',
            method: 'GET',
            success: function (data) {
                var grouped = _.groupBy(data, function (item) {
                    return item.RaceId;
                });
                var races = [];
                _.each(grouped, function (item) {
                    var race = item[0];
                    var dateParts = race.Date.split('.');
                    var date = new Date(dateParts[2], dateParts[1] - 1, dateParts[0]);
                    var mainData = {
                        Name: race.Name,
                        Date: date.toLocaleDateString(),
                        Url: race.Url,
                        Lat: race.Lat,
                        Lng: race.Lng,
                        Place: race.Place,
                        Description: race.Description
                    };
                    var dists = [];
                    _.each(item, function(r){
                        dists.push(r.Type);
                    });
                    mainData.Dists = dists;
                    races.push(mainData);
                });
                app.races.reset(races);
                if (onSuccess) {
                    onSuccess();
                }
            },
            error: function (err) {
                var d = err;
            }
        });
    }

    var DataService = {
        getData: function () {
            app.races = new Races();
            getInitialData(false);
        },
        saveData: function(){
            localStorage.setItem('races', JSON.stringify(races.toJSON()));
        }
    };

    return DataService;
});