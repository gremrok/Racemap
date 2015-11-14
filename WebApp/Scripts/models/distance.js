define(['backbone'], function (Backbone) {
    var Distance = Backbone.Model.extend({
        default: {
            name: '',
            length: 0,
            track: null,
            price: 0

        },
        initialize: function () { },

        //localStorage: new Store("race"),

        clear: function () {
            this.destroy();
        }

    });
    return Distance;
});
