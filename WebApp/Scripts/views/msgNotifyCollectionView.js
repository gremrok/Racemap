define(['jquery', 'underscore', 'backbone', 'marionette', 'views/msgNotifyItemView'], function ($, _, Backbone, Marionette, MsgNotifyItemView) {
    var MsgNotifyCollectionView = Marionette.CollectionView.extend({
        childView: MsgNotifyItemView,
        tagName: 'ul',
        className: 'menu'
    });
    return MsgNotifyCollectionView;
});