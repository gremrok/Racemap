define(['jquery', 'underscore', 'backbone', 'marionette', 'views/notifyItemView'], function ($, _, Backbone, Marionette, NotifyItemView) {
    var NotifyCollectionView = Marionette.CollectionView.extend({
        childView: NotifyItemView,
        tagName: 'ul',
        className: 'menu'
    });
    return NotifyCollectionView;
});