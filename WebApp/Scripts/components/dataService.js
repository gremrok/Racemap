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
            var self = this;
            
            //todo
            //$.ajax({
            //    url: '/api/RaceApi/postRaces',
            //    method: 'POST',
            //    data: JSON.stringify(db2015),
            //    contentType: 'application/json',
            //    success: function (res) {
            //        var x = res;
            //    },
            //    error: function (er) {
            //        var f = er;
            //    }
            //})
        },
        saveData: function(){
            localStorage.setItem('races', JSON.stringify(races.toJSON()));
        }
    };

    return DataService;
});