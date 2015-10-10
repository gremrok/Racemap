requirejs.config({
    //By default load any module IDs from scripts/lib
    baseUrl: 'scripts/lib',
    paths: {
        models: '../models',
        collections: '../collections',
        views: '../views',
        routers: '../routers',
        components: '../components',
        modalDialog: 'backbone.ModalDialog',
        marionette: 'backbone.marionette',
        leaflet: 'leaflet-src',
        handlebars: 'handlebars',
        text: 'text'
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
        handlebars: {
            deps: [],
            exports: "Handlebars"
        }
    }
});

var app = app || {};
require(['routers/router', 'components/dataService'], function (router, dataService) {
    $(document).ready(function () {
        dataService.getData();
        router.start();
    });
});