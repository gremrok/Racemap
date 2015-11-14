define(['jquery', 'underscore', 'backbone', 'marionette', 'handlebars', 'text!../../templates/msgNotify.html', 'views/msgNotifyCollectionView'], function ($, _, Backbone, Marionette, Handlebars, tmpl, MsgNotifyCollectionView) {
    var MsgNotifyView = Marionette.ItemView.extend({
        tagName: 'li',
        className: 'dropdown messages-menu',
        template: Handlebars.compile(tmpl),
        templateHelpers: function(){
            return { count: this.model.get('messages').length };
        },
        onRender: function () {
            var view = new MsgNotifyCollectionView({
                collection: this.model.get('messages')
            });
            view.render();
            view.$el.appendTo($('.messages', this.$el));
            return this;
        }
    });
    return MsgNotifyView;
});