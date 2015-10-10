define(['jquery', 'underscore', 'backbone', 'marionette', 'handlebars', 'views/msgNotifyItemView', 'text!../../templates/msgNotifyCollection.html'], function ($, _, Backbone, Marionette, Handlebars, MsgNotifyItemView, tmpl) {
    var MsgNotifyCollectionView = Marionette.CollectionView.extend({
        childView: MsgNotifyItemView,
        template: Handlebars.compile(tmpl)
    });
    return MsgNotifyCollectionView;
});