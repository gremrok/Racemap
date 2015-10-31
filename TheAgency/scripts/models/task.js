define(['backbone'], function (Backbone) {
    var Task = Backbone.Model.extend({
        defaults: {
            url: '#',
            complete: 20,
            text: 'Something happend...',
            color: 'progress-bar-aqua'
        },
        initialize: function () { },

        //localStorage: new Store("race"),

        clear: function () {
            this.destroy();
        }

    });
    return Task;
});