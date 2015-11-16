define(['jquery', 'underscore', 'backbone', 'marionette', 'handlebars', 'text!../../templates/markerView.html'], function ($, _, Backbone, Marionette, Handlebars, tmpl) {
    var MarkerView = Marionette.ItemView.extend({
        template: Handlebars.compile(tmpl),
        className: 'marker-item',
        templateHelpers: function () {
            return {
                dists: this.model.get('distances'),
                sites: this.model.get('sites')
            };
        }
    });
    return MarkerView;
});