/// <reference path="../models/distance.js" />
define(['backbone', 'models/distance'], function (Backbone, Distance) {
    var DistanceList = Backbone.Collection.extend({

        // reference to this collection's model.
        model: Distance,

        //localStorage: new Store("race"),

        
    });
    return DistanceList;
});