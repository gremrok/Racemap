/// <reference path="../models/race.js" />
define(['backbone', 'models/race'], function (Backbone, Race) {
    var RaceList = Backbone.Collection.extend({
        url: '/api/raceapi/getRaces',
        // reference to this collection's model.
        model: Race,

        //localStorage: new Store("race"),

        add_new: function (race) {
            this.create(race);
        },

        // Races are sorted by their name
        comparator: function (race) {
            return race.get('name');
        },

        remove_all: function () {
            var model;
            while (model = this.pop()) {
                model.destroy();
            }
        }
    });
    return RaceList;
});