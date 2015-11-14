define(['backbone'], function (Backbone) {
    var MsgNotify = Backbone.Model.extend({
        defaults: {
            avatar: 'dist/img/user2-160x160.jpg',
            senderFullName: 'John Smitt',
            title: 'Enjoy!',
            body: 'You are pretty clever programmer',
            timestamp: ''
        },
        initialize: function () { },

        //localStorage: new Store("race"),

        clear: function () {
            this.destroy();
        }

    });
    return MsgNotify;
});