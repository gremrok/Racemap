define(['jquery', 'underscore', 'backbone', 'collections/race', 'models/race'], function ($, _, Backbone, Races, Race) {
    var AppController = {
        currentView: null,
        race: function() {
            var self = this;
            require(['views/homeView'], function(HomeView) {
                app.races = new Races();
                var view = new HomeView();
                view.render();
                var filterModel = new Race({
                    //startDate: '2015-11-01',
                    //endDate: '2015-12-31'
                });
                view.makeFilter(filterModel);
                self.renderView.call(self, view);
            });
        },
        details: function(id) {
            var self = this;
            require(['views/detailsView'], function(DetailsView) {
                var race = app.races.get(id),
                    view = new DetailsView({ model: race });
                self.renderView.call(self, view);
            });
        },
        createRace: function() {
            var self = this;
            require(['views/createView'], function(CreateView) {
                var view = new CreateView();
                self.renderView.call(self, view);
            });
        },
        renderView: function(view) {
            this.currentView && this.currentView.remove();
            $('#main').html(view.el);
            this.currentView = view;
        }
    };
    return AppController;
});