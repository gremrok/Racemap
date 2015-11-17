define(['jquery', 'underscore', 'backbone', 'marionette', 'handlebars', 'text!../../templates/raceFilter.html'], function ($, _, Backbone, Marionette, Handlebars, tmpl) {
    var RaceFilterView = Marionette.ItemView.extend({
        template: Handlebars.compile(tmpl),
        events: {
            'click a[distance]': 'toggleBtnFilterDistance',
            'keyup input': 'filterTextChanged',
            'change #start-date': 'startDateChanged',
            'change #end-date': 'endDateChanged',
        },
        initialize: function(options){
            this.options = options;
        },
        templateHelpers: function () {
            var map = [
                'До 5 км',
                'От 5 до 10 км',
                'От 10 до 15 км',
                'От 15 до ПМ',
                'От ПМ до М',
                'Сверхмарафон'
            ];
            _.each(this.options.races, function (race) {
                _.each(race.distances, function (dist) {
                    var clear = parseFloat(dist.replace('км', '').replace(/ /g, ''));
                    if (clear) {
                        if (clear <= 5) {
                            race.categoryId = 0;
                        }
                        else if (clear> 5 && clear <= 10) {
                            race.categoryId = 1;
                        }
                        else if (clear > 10 && clear <= 15) {
                            race.categoryId = 2;
                        }
                        else if (clear > 15 && clear <= 21.1) {
                            race.categoryId = 3;
                        }
                        else if (clear > 21.1 && clear <= 42.2) {
                            race.categoryId = 4;
                        }
                        else if (clear > 42.2) {
                            race.categoryId = 5;
                        }
                    }
                });
            });
            var categories = _.groupBy(this.options.races, 'categoryId');
            return {
                categories: _.map(_.keys(categories), function(item){ return map[item]; })
            }
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
        startDateChanged: function(e) {
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