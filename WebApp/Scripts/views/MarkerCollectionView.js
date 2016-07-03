define(['jquery', 'underscore', 'backbone', 'marionette', 'handlebars', 'text!../../templates/markerCollection.html', 'views/markerListItemView'], function ($, _, Backbone, Marionette, Handlebars, tmpl, MarkerListItemView) {
    var MarkerCollectionView = Marionette.CollectionView.extend({
        template: Handlebars.compile(tmpl),
        childView: MarkerListItemView,
        tagName: 'ul',
        className: 'markers',
        onRender: function () {
            this.$el
                .css('height', '200px')
                .css('width', '400px')
                .css('overflow-y', 'auto')
                .css('overflow-x', 'hidden');
            
        }
    });
    return MarkerCollectionView;
});