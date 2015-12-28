define(['jquery', 'underscore', 'backbone', 'marionette', 'handlebars', 'text!../../templates/markerListItem.html'], function ($, _, Backbone, Marionette, Handlebars, tmpl) {
    var MarkerListItemView = Marionette.ItemView.extend({
        template: Handlebars.compile(tmpl),
        className: 'marker-list-item',
        tagName: 'li',
        templateHelpers: function () {
            return {
                startDate: (new Date(this.model.get('StartDate'))).toLocaleDateString(),
                dists: this.model.get('distances'),
                sites: this.model.get('sites')
            };
        }
    });
    return MarkerListItemView;
});