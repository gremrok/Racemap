requirejs.config({
    //By default load any module IDs from scripts/lib
    baseUrl: 'Scripts/lib',
    paths: {
        models: '../models',
        collections: '../collections',
        views: '../views',
        routers: '../routers',
        components: '../components',
        modalDialog: 'backbone.ModalDialog',
        marionette: 'backbone.marionette',
        leaflet: 'leaflet-src',
        markerCluster: 'leaflet.markercluster-src',
        handlebars: 'handlebars',
        text: 'text',
        jsonData: '../data'
    },
    shim: {
        'backbone': {
            deps: ['underscore', 'jquery'],
            exports: 'Backbone'
        },
        'underscore': {
            exports: '_'
        },
        'marionette': {
            deps: ['backbone'],
            exports: 'Marionette'
        },
        'leaflet': {
            exports: 'L'
        },
        'handlebars': {
            deps: [],
            exports: "Handlebars"
        }
    }
});

var app = app || {};
require(['routers/router', 'components/dataService'], function (router, dataService) {
    $(document).ready(function () {
        dataService.getData();
        //router.start();
    });
});