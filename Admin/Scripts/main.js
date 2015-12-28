(function () {
    $.ajax({
        url: 'api/Races/',
        method: 'GET',
        success: function (data) {
            var x = data;
        },
        error: function (er) {
            var p = err;
        }
    });
})();