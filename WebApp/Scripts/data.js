/// <reference path="../dist/aims-races.html" />
(function () {
    var data = [];
    var index = 0;
    $.ajax({
        url: '../dist/aims-races.html',
        method: 'get',
        success: function (html) {
            var $country = $('.country', $(html));
            var $dataCountry = $country.next('table');
            _.each($dataCountry, function (country) {
                var rows = $('tr', $(country)).not('.dirhdr');
                _.each(rows, function (row) {
                    index++;
                    var race = $('.race', $(row)).text().replace(/\n/g, ' ');
                    var contact = $('.cont', $(row)).text().replace(/\n/g, ' ');
                    var phone = $('.phon', $(row)).text().replace(/\n/g, ' ');
                    var address = $('.addr', $(row)).text().replace(/\n/g, ' ');
                    data.push({ id: index, name: race, contact: contact, phone: phone, address: address });
                });
            });
            
            var i=0;
            
            var interval = setInterval(function () {
                var r = data[i];
                $.ajax({
                    url: 'http://maps.google.com/maps/api/geocode/json?address=' + r.address + '&sensor=false',
                    method: 'get',
                    success: function (response) {
                        if (response.results.length > 0) {
                            var loc = response.results[0].geometry.location;
                            r.lnglat = [loc.lng, loc.lat];
                        }
                    }
                });
                i++;

                if (i >= data.length) {
                    clearInterval(interval);
                                       
                    console.log(JSON.stringify(data));
                }
            }, 1000);
        }
    });
})();