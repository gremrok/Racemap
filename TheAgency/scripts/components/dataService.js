define(['collections/race'], function (Races) {
    function getRacesFromCache() {
        var racesString = localStorage.getItem("races");
        if (!racesString) {
            getInitialData();
            racesString = localStorage.getItem("races");
        }
        return JSON.parse(racesString);
    };

    function getInitialData() {
        var races = [
          {
              name: 'Московский марафон',
              lnglat: [55.715701, 37.551654],
              city: 'Москва',
              place: 'Лужники',
              distances: [10, 42],
              date: '21.09.2014 09:00'
          },
          {
              name: 'Кузьминский марафон',
              lnglat: [55.667776, 37.811407],
              city: 'Москва',
              place: 'Кузьминский парк',
              distances: [42],
              date: '29.09.2014 09:00'
          },
          {
              name: 'Полумарафон Лось',
              lnglat: [55.853594, 37.833897],
              city: 'Москва',
              place: 'парк Лосиный остров',
              distances: [10, 21],
              date: '06.10.2014 09:00'
          },
          {
              name: 'Красногорский марафон',
              lnglat: [55.810291, 37.345789],
              city: 'Красногорск',
              place: 'Павшинская пойма',
              distances: [10, 42],
              date: '01.11.2014 09:00'
          },
          {
              name: 'Бутовский трейловый марафон',
              lnglat: [55.586140, 37.510140],
              city: 'Москва',
              place: 'Бутовский парк',
              distances: [10, 42],
              date: '01.11.2015 09:00'
          }
        ];
        localStorage.setItem('races', JSON.stringify(races));
    }

    var DataService = {
        getData: function () {
            var races = getRacesFromCache();
            app.races = new Races(races);
        },
        saveData: function(){
            localStorage.setItem('races', JSON.stringify(races.toJSON()));
        }
    };

    return DataService;
});