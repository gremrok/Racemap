define(['jquery', 'underscore', 'backbone', 'marionette', 'handlebars', 'text!../../templates/msgNotify.html', 'views/msgNotifyCollectionView'], function ($, _, Backbone, Marionette, Handlebars, tmpl, MsgNotifyCollectionView) {
    var MsgNotifyView = Marionette.ItemView.extend({
        el: '.messages-menu',
        ui: {
            messages: '.messages'
        },
        template: Handlebars.compile(tmpl),
        templateHelpers: function(){
            return { count: this.model.get('messages').length };
        },
        onRender: function () {
            var view = new MsgNotifyCollectionView({
                collection: new Backbone.Collection(this.model.get('messages'))
            });
            view.render();
            this.ui.messages.html(view.$el.html());
        }
    });
    return MsgNotifyView;
});