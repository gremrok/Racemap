define(['jquery', 'underscore', 'backbone', 'marionette', 'leaflet', 'markerCluster', 'handlebars', 'text!../../templates/home.html', 'views/markerView', 'views/markerCollectionView', 'views/navbarCustomMenuView', 'views/raceFilterView', 'models/race', 'routers/router'],
 function ($, _, Backbone, Marionette, L, MC, Handlebars, tmpl, MarkerView, MarkerCollectionView, NavbarCustomMenuView, RaceFilterView, Race, Router) {
     var homeView = Marionette.LayoutView.extend({
         template: Handlebars.compile(tmpl),
         initialize: function () {
             var self = this;
             this.collection = app.races;
             this.listenTo(this.collection, 'reset', this.render);
             $.ajax({
                 url: '/api/raceapi/getRaces',
                 method: 'GET',
                 success: function (data) {
                     races = data;
                     app.races.reset(races);
                 }
             });
         },
         onRender: function () {
             this.$el.append(this.addCreateRaceButton());
                          
             if (!this.map) {
                 var map = L.map('map').setView([55.753878, 37.649275], 9);
                 this.map = map;
                 map.markers = [];
                 L.tileLayer('http://{s}.tile.osm.org/{z}/{x}/{y}.png', {
                     attribution: '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                 }).addTo(map);
             }
             this.showMarkers(app.races.toJSON(), this.map);
             return this;
         },
         loadData: function () {
             var races = app.races.toJSON();
             _.each([], function (data) {
                 var lnglat = [];
                 lnglat.push(data.lng);
                 lnglat.push(data.lat);
                 races.push({
                     lnglat: lnglat,
                     place: data.address,
                     name: data.name
                 });

             });

             return races;
         },
         showMarkers: function (races, map) {
             _.each(map.markers, function (marker) {
                 map.removeLayere(marker);
             });

             //this.collection.each(function (item) {
             //    this.addOne(item);
             //}, this);

             var markers = L.markerClusterGroup({
                 maxClusterRadius: 120,
                 iconCreateFunction: function (cluster) {
                     var markers = cluster.getAllChildMarkers();
                     var n = markers.length;
                     for (var i = 0; i < markers.length; i++) {
                         n += markers[i].number;
                     }
                     return L.divIcon({
                         html: n,
                         className: 'mycluster',
                         iconSize: L.point(40, 40)
                     });
                 },
                 //Disable all of the defaults:
                 spiderfyOnMaxZoom: false,
                 showCoverageOnHover: false,
                 zoomToBoundsOnClick: false
             });

             var racesByLatLng = {};
             _.each(races, function (item) {
                 if (item.Lng && item.Lat) {
                     var latlng = [item.Lat, item.Lng];
                     var coords = [];
                     if (racesByLatLng[latlng]){
                         racesByLatLng[latlng].push(item);
                     }
                     else {
                         coords.push(item);
                         racesByLatLng[latlng] = coords;
                     }
                 }
             });
             var keys = _.keys(racesByLatLng);
             var setPoint = function (point, content) {
                 var marker = L.marker([point.Lat, point.Lng])
                     .bindPopup(content)
                     .openPopup();
                 return marker;
             }
             _.each(racesByLatLng, function (item) {
                 var marker;
                 if (item.length == 1) {
                     var m = new Backbone.Model(item[0]);
                     var markerView = new MarkerView({ model: m });
                     markerView.render();
                     var markerViewContent = markerView.$el.html();
                     marker = setPoint(item[0], markerViewContent);
                     marker.number = 1;
                 }
                 else {
                     var collection = new Backbone.Collection(item);
                     var markerCollectionView = new MarkerCollectionView({ collection: collection });
                     markerCollectionView.render();
                     var markerCollectionViewContent = markerCollectionView.$el[0].outerHTML;
                     marker = setPoint(item[0], markerCollectionViewContent);
                     marker.number = item.length;
                 }

                 map.markers.push(marker);
                 markers.addLayer(marker);
             });
             map.addLayer(markers);


             function populateRandomVector() {
                 for (var i = 0, latlngs = [], len = 20; i < len; i++) {
                     latlngs.push(getRandomLatLng(map));
                 }
                 var path = L.polyline(latlngs);
                 map.addLayer(path);
             }
             function getRandomLatLng(map) {
                 var bounds = map.getBounds(),
                     southWest = bounds.getSouthWest(),
                     northEast = bounds.getNorthEast(),
                     lngSpan = northEast.lng - southWest.lng,
                     latSpan = northEast.lat - southWest.lat;

                 return L.latLng(
                         southWest.lat + latSpan * Math.random(),
                         southWest.lng + lngSpan * Math.random());
             }
                          
             var shownLayer, polygon;

             function removePolygon() {
                 if (shownLayer) {
                     shownLayer.setOpacity(1);
                     shownLayer = null;
                 }
                 if (polygon) {
                     map.removeLayer(polygon);
                     polygon = null;
                 }
             };

             markers.on('clustermouseover', function (a) {
                 removePolygon();

                 a.layer.setOpacity(0.2);
                 shownLayer = a.layer;
                 polygon = L.polygon(a.layer.getConvexHull());
                 map.addLayer(polygon);
             });
             markers.on('clustermouseout', removePolygon);
             map.on('zoomend', removePolygon);


         },
         makeFilter: function (filterModel) {
             var self = this;
             var filterView = new RaceFilterView({
                 model: filterModel
             });
             filterView.on('modelChanged', function (model) {
                 applyFilter(model);
             });
             var applyFilter = function (model) {
                 var races = self.collection.toJSON();
                 if (model.get('startDate')) {
                     races = _.filter(races, function (item) {
                                                 
                         return item.StartDate >= model.get('startDate')
                                && item.StartDate <= model.get('endDate');
                     });
                 }
                 
                 if (model.get('categories').length > 0) {
                     var found = [];
                     _.each(model.get('categories'), function (category) {
                         var filtered = _.filter(races, function (item) {
                             return _.contains(item.Categories, category);
                         });
                         _.each(filtered, function (item) {
                             if (!_.contains(found, item)) {
                                 found.push(item);
                             }
                         });
                     });
                     races = found;
                 }

                 var name = model.get('name');
                 if (name !== '') {
                     races = _.filter(races, function (item) {
                         return item.Name.toLowerCase().indexOf(name.toLowerCase()) > -1;
                     });
                 }
                 self.showMarkers(races, self.map);
             };
             filterView.on('distanceChanged', function (distance) {
                 var races = _.filter(app.races.toJSON(), function (item) {
                     return _.contains(item.distances, distance);
                 });
                 self.showMarkers(races, self.map);
             });

             filterView.render();
             $('#filter').html(filterView.el);
             applyFilter(filterModel);
         },
         makeMenu: function () {
             var messages = [
                {
                    avatar: 'dist/img/user2-160x160.jpg',
                    senderFullName: 'John Smitt',
                    title: 'Enjoy!',
                    body: 'You are pretty clever programmer',
                    timestamp: '4 mins'
                },
                {
                    avatar: 'dist/img/user2-160x160.jpg',
                    senderFullName: 'John Walker',
                    title: 'Enjoy funny!',
                    body: 'You are pretty nice designer',
                    timestamp: '6 mins'
                },
                {
                    avatar: 'dist/img/user2-160x160.jpg',
                    senderFullName: 'Christy Fine',
                    title: 'Fine art!',
                    body: 'You are pretty clever programmer and designer!',
                    timestamp: '8 mins'
                },
                {
                    avatar: 'dist/img/user2-160x160.jpg',
                    senderFullName: 'Odry Williams',
                    title: 'Good work!',
                    body: 'You are pretty clever programmer. Nice work!',
                    timestamp: '15 mins'
                }
             ];

             var notifications = [
                 {
                     icon: 'fa-hand-scissors-o',
                     color: 'text-green',
                     text: 'All tasks completed!'
                 },
                 {
                     icon: 'fa-warning',
                     color: 'text-red',
                     text: 'Something happend...'
                 },
                 {
                     icon: 'fa-user',
                     color: 'text-aqua',
                     text: 'New user registered'
                 },
                 {
                     icon: 'fa-users',
                     color: 'text-yellow',
                     text: 'New runners club added'
                 },
                 {
                     icon: 'fa-shopping-cart',
                     color: 'text-blue',
                     text: 'You have 5 items in shoping cart.'
                 }
             ];

             var tasks = [
                 {
                     url: '/tasks/1',
                     complete: 10,
                     text: 'Separate html on templates',
                     color: 'progress-bar-aqua'
                 },
                 {
                     url: '/tasks/2',
                     complete: 12,
                     text: 'Create backbone models',
                     color: 'progress-bar-red'
                 },
                 {
                     url: '/tasks/3',
                     complete: 8,
                     text: 'Create marionette views',
                     color: 'progress-bar-green'
                 },
                 {
                     url: '/tasks/4',
                     complete: 1,
                     text: 'Create api',
                     color: 'progress-bar-blue'
                 },
                 {
                     url: '/tasks/5',
                     complete: 60,
                     text: 'Make design',
                     color: 'progress-bar-yellow'
                 },
                 {
                     url: '/tasks/6',
                     complete: 1,
                     text: 'Organize test',
                     color: 'progress-bar-black'
                 }
             ];
             var menuItemsCollection = new Backbone.Model({
                 messages: new Backbone.Collection(messages),
                 notifications: new Backbone.Collection(notifications),
                 tasks: new Backbone.Collection(tasks),
             });

             var navbarView = new NavbarCustomMenuView({ model: menuItemsCollection });
             navbarView.render();
             $('#navbar-custom-menu').html(navbarView.el);
         },
         addCreateRaceButton: function () {
             var btn = document.createElement('input');
             btn.type = 'button';
             btn.value = 'Create Race';
             btn.className = 'default';
             btn.id = 'btnCreateRace';
             btn.addEventListener('click', function () {
                 Router.navigate('#/createRace', { trigger: true });
             }, false);
             return btn;
         },
         addOne: function (race) {
             var view = new MarkerView({ model: race });
             this.$el.append(view.render().el);
         }
     });
     return homeView;
 });