define(['jquery', 'underscore', 'backbone', 'marionette', 'handlebars', 'text!../../templates/raceFilter.html'], function ($, _, Backbone, Marionette, Handlebars, tmpl) {
    var RaceFilterView = Marionette.ItemView.extend({
        template: Handlebars.compile(tmpl),
        events: {
            'click a[distance]': 'toggleBtnFilterDistance',
            'keyup input[name="q"]': 'filterTextChanged',
            'change #start-date': 'startDateChanged',
            'change #end-date': 'endDateChanged',
            'change input[type="checkbox"]': 'categoryChanged',
            'click #search-btn': 'nameChanged'
        },
        initialize: function (options) {
            this.options = options;
        },
        templateHelpers: function () {
            var map = [
                { id: 0, name: 'До 5 км' },
                { id: 1, name: 'От 5 до 10 км' },
                { id: 2, name: 'От 10 до 15 км' },
                { id: 3, name: 'От 15 до ПМ', },
                { id: 4, name: 'От ПМ до М', },
                { id: 5, name: 'Сверхмарафон' },
            ];
            return {
                categories: map
            }
        },
        nameChanged: function(){
            var name = $('input[name="q"]', this.$el).val();
            this.model.set('name', name);
            this.trigger('modelChanged', this.model);
        },
        categoryChanged: function(e){
            var target = $(e.target)[0];
            var categories = this.model.get('categories') || [];
            if (target.checked) {
                if (categories.indexOf(target.id) == -1) {
                    categories.push(target.id);
                }
            }
            else {
                categories.splice(categories.indexOf(target.id), 1);
            }
            this.model.set('categories', categories);
            this.trigger('modelChanged', this.model);
        },
        toggleBtnFilterDistance: function (e) {
            var $target = $(e.currentTarget);
            $target.toggleClass('down');
            var getValue = function (item) {
                return parseInt($(item).attr('distance'));
            };
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
        },
        startDateChanged: function (e) {
            var $target = $(e.currentTarget);
            this.model.set('startDate', new Date($target.val()));
            this.trigger('modelChanged', this.model);
        },
        endDateChanged: function (e) {
            var $target = $(e.currentTarget);
            this.model.set('endDate', new Date($target.val()));
            this.trigger('modelChanged', this.model);
        },
        onRender: function () {

        }
    });
    return RaceFilterView;
});