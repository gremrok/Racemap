define(['jquery', 'underscore', 'backbone', 'marionette', 'handlebars', 'text!../../templates/notify.html', 'views/notifyCollectionView'], function ($, _, Backbone, Marionette, Handlebars, tmpl, NotifyCollectionView) {
    var NotifyView = Marionette.ItemView.extend({
        tagName: 'li',
        className: 'dropdown notifications-menu',
        template: Handlebars.compile(tmpl),
        templateHelpers: function () {
            return { count: this.model.get('notifications').length };
        },
        onRender: function () {
            var view = new NotifyCollectionView({
                collection: this.model.get('notifications')
            });
            view.render();
            view.$el.appendTo($('.notifications', this.$el));
            return this;
        }
    });
    return NotifyView;
});