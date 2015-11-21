define(['jquery', 'underscore', 'backbone', 'marionette', 'handlebars', 'text!../../templates/markerView.html'], function ($, _, Backbone, Marionette, Handlebars, tmpl) {
    var MarkerView = Marionette.ItemView.extend({
        template: Handlebars.compile(tmpl),
        className: 'marker-item',
        templateHelpers: function () {
            var months = [
                'January',
                'February',
                'March',
                'April',
                'May',
                'June',
                'July',
                'August',
                'September',
                'October',
                'November',
                'December'
            ];
            return {
                dists: this.model.get('distances'),
                sites: this.model.get('sites'),
                m: months[this.model.get('month')-1]
            };
        }
    });
    return MarkerView;
});