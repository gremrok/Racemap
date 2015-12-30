(function () {
    var parseAhotu = function () {
        var i = 0;
        var races = [];
        var ahotuID = 1;
        var places = {};

        var saveRaces = function (page, id) {
            $.ajax({
                url: '/home/index',
                type: 'post',
                data: JSON.stringify(races)
            }).success(function(s) {
                var x = s;
            }).error(function(e) {
                var t = e;
            });
            races = [];
        };
        var start = function (n) {
            var interval = setInterval(function () {
                $.ajax({
                    url: 'http://marathons.ahotu.com/calendar?page=' + i,
                    method: 'GET',
                    success: function (data) {
                        var $content = $(data);

                        var raceItems = $('.list-group-item.calendar', $content);

                        for (var a = 0; a < raceItems.length; a++) {
                            setTimeout(function (x) {
                                return function () {
                                    var raceItem = raceItems[x];
                                    var name = $('h4', $(raceItem)).text().trim();
                                    var url = $(raceItem)[0].href.replace(window.location.host, 'marathons.ahotu.com');
                                    var description = $('em', $(raceItem)).text().trim();
                                    var ul = $('ul.calendar_race', $(raceItem));
                                    var lis = $('li', $(ul));

                                    var date = lis[0].innerText.trim();
                                    var place = _.map(lis[1].innerText.split('|'), function (x) { return x.trim(); }).join(',');
                                    var type = lis[2].innerText.trim();
                                    var categoryFull = $('i', $(lis[2]))[0].className;
                                    var category = _.last($('i', $(lis[2]))[0].className.split(' '));
                                    if (lis.length > 3) {
                                        var tags = _.map($('span', lis[3]), function (tag) { return $(tag).text().trim(); }).join(',');
                                    }
                                    var lnglat = [];
                                    if (!places[place]) {
                                        var geocoder = ymaps.geocode(place).then(
                                            function (res) {
                                                var loc = res.geoObjects.get(0).geometry.getCoordinates();
                                                places[place] = loc;
                                                var lng = loc.length == 2 ? loc[0] : null;
                                                var lat = loc.length == 2 ? loc[1] : null;
                                                races.push({
                                                    id: ahotuID,
                                                    name: name,
                                                    description: description,
                                                    date: date,
                                                    place: place,
                                                    type: type,
                                                    category: category,
                                                    categoryFull: categoryFull,
                                                    url: url,
                                                    tags: tags,
                                                    lng: lng,
                                                    lat: lat
                                                });
                                                ahotuID += 1;
                                                if (races.length == 9990) {
                                                    saveRaces(i, ahotuID);
                                                }
                                            },
                                            function (err) {
                                                alert('Ошибка');
                                                clearInterval(interval);
                                                saveRaces(i, ahotuID);
                                            });
                                    } else {
                                        var loc = places[place];
                                        var lng = loc.length == 2 ? loc[0] : null;
                                        var lat = loc.length == 2 ? loc[1] : null;
                                        races.push({
                                            ahotuID: ahotuID,
                                            name: name,
                                            description: description,
                                            date: date,
                                            place: place,
                                            type: type,
                                            category: category,
                                            categoryFull: categoryFull,
                                            url: url,
                                            tags: tags,
                                            lng: lng,
                                            lat: lat
                                        });
                                        ahotuID += 1;
                                        if (races.length == 9990) {
                                            saveRaces(i, ahotuID);
                                        }
                                    }
                                }
                            }(a), 1000 * a);
                        }



                        //$.ajax({
                        //    url: 'https://maps.google.com/maps/api/geocode/json?address=' + place + '&sensor=false&key=AIzaSyDKC3dnkC-mQQ3bB8NxT_Y3PdM11Dpe8-k',
                        //    method: 'get',
                        //    success: function(response) {
                        //        var lng, lat;
                        //        if (response.results.length > 0) {
                        //            var loc = response.results[0].geometry.location;
                        //            lnglat = [loc.lng, loc.lat];
                        //            lng = loc.lng;
                        //            lat = loc.lat;
                        //        }
                        //        races.push({
                        //            ahotuID: ahotuID,
                        //            name: name,
                        //            description: description,
                        //            date: date,
                        //            place: place,
                        //            type: type,
                        //            category: category,
                        //            categoryFull: categoryFull,
                        //            url: url,
                        //            tags: tags,
                        //            lng: lng,
                        //            lat: lat
                        //        });
                        //        ahotuID += 1;
                        //        if (races.length == 1500) {
                        //            saveRaces();
                        //        }
                        //    },
                        //    error: function(err) {
                        //        clearInterval(interval);
                        //        saveRaces();
                        //    }
                        //});

                    }
                });
                i++;

                if (i >= 2657) {
                    clearInterval(interval);
                    saveRaces(i, ahotuID);
                }
            }, 2000);
        };
        start();
    };

    parseAhotu();
})();