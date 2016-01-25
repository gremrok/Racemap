define(['collections/race', 'routers/router'], function (Races, router) {
    function getInitialData(onSuccess) {
        $.ajax({
            url: '/api/raceapi/getRaces',
            method: 'GET',
            success: function (data) {
                app.races.reset(data);
                if (onSuccess) {
                    onSuccess();
                }
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