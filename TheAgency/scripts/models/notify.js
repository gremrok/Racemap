define(['backbone'], function (Backbone) {
    var Notify = Backbone.Model.extend({
        defaults: {
            icon: 'fa-warning',
            color: 'text-red',
            text: 'Something happend...'
        },
        initialize: function () { },

        //localStorage: new Store("race"),

        clear: function () {
            this.destroy();
        }

    });
    return Notify;
});