define(['backbone'], function (Backbone) {
    var Race = Backbone.Model.extend({
        defaults: {
            name: '',
            lnglat: [null, null],
            city: '',
            place: '',
            distances: [],
            startDate: '',
            endDate: '',
            cityId: null,
            countryId: null,
            isFree: false,
            categories: []
        },
        initialize: function () { },

        //localStorage: new Store("race"),

        clear: function () {
            this.destroy();
        }

    });
    return Race;
});
