define(['jquery', 'underscore', 'backbone'], function ($, _, Backbone) {
    var AppController = {
        currentView: null,
        home: function () {
            var self = this;
            require(['views/homeView'], function (HomeView) {
                var view = new HomeView();
                view.render();
                view.makeFilter();
                view.makeMenu();
                self.renderView.call(self, view);
            });
        },
        details: function (id) {
            var self = this;
            require(['views/detailsView'], function (DetailsView) {
                var race = app.races.get(id),
                view = new DetailsView({ model: race});
                self.renderView.call(self, view);
            });
        },
        createRace: function () {
            var self = this;
            require(['views/createView'], function (CreateView) {
                var view = new CreateView();
                self.renderView.call(self, view);
            });
        },
        renderView: function (view) {
            this.currentView && this.currentView.remove();
            $('#main').html(view.el);
            this.currentView = view;
        }
    }
    return AppController;
});