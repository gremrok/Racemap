define(['jquery', 'underscore', 'backbone', 'marionette', 'handlebars', 'text!../../templates/raceFilter.html'], function ($, _, Backbone, Marionette, Handlebars, tmpl) {
    var RaceFilterView = Marionette.ItemView.extend({
        template: Handlebars.compile(tmpl),
        events: {
            'click a[distance]': 'toggleBtnFilterDistance',
            'keyup input': 'filterTextChanged'
        },
        toggleBtnFilterDistance: function (e) {
            var $target = $(e.currentTarget);
            $target.toggleClass('down');
            var getValue = function (item) {
                return parseInt($(item).attr('distance'));
            }
            var distances = _.map($('.down', $target.parent().parent()), function (item) {
                return getValue(item);
            }) || [];
            this.model.set('distances', distances);
            this.trigger('modelChanged', this.model);
        },
        filterTextChanged: function (e) {
            if (e.keyCode == 13) {
                var $target = $(e.currentTarget);
                var name = $target.val();
                this.model.set('name', name);
                this.trigger('modelChanged', this.model);
            }
        }
    });
    return RaceFilterView;
});