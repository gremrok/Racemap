define(['jquery', 'underscore', 'backbone', 'marionette', 'leaflet', 'handlebars', 'text!../../templates/home.html', 'views/markerView', 'views/markerCollectionView', 'views/navbarCustomMenuView', 'views/raceFilterView', 'models/race', 'routers/router'],
 function ($, _, Backbone, Marionette, L, Handlebars, tmpl, MarkerView, MarkerCollectionView, NavbarCustomMenuView, RaceFilterView, Race, Router) {
     var homeView = Marionette.LayoutView.extend({
         template: Handlebars.compile(tmpl),
         initialize: function () {
             this.collection = new Backbone.Collection(app.races);
         },
         onRender: function () {
             //this.$el.empty();
             this.$el.append(this.addCreateRaceButton());

             this.collection.each(function (item) {
                 this.addOne(item);
             }, this);

             var map = L.map('map').setView([55.753878, 37.649275], 9);
             this.map = map;
             map.markers = [];
             L.tileLayer('http://{s}.tile.osm.org/{z}/{x}/{y}.png', {
                 attribution: '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
             }).addTo(map);

             this.showMarkers(this.collection.toJSON(), map);
             this.makeFilter();
             //this.makeMenu();
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
             for (var i = 0; i < map.markers.length; i++) {
                 map.removeLayer(map.markers[i]);
             }
             var markers = new L.FeatureGroup();
             var racesByLatLng = {};
             _.each(races, function (item) {
                 if (item.lng && item.lat) {
                     var latlng = [item.lat, item.lng];
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
                 var marker = L.marker([point.lat, point.lng])
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
                 }
                 else {
                     var collection = new Backbone.Collection(item);
                     var markerCollectionView = new MarkerCollectionView({ collection: collection });
                     markerCollectionView.render();
                     var markerCollectionViewContent = markerCollectionView.$el[0].outerHTML;
                     marker = setPoint(item[0], markerCollectionViewContent);
                 }

                 map.markers.push(marker);
                 markers.addLayer(marker);
             });
             map.addLayer(markers);
         },
         makeFilter: function () {
             var self = this;
             var filterView = new RaceFilterView({ model: new Race(), races: self.collection.toJSON() });
             //todo: define filterModel (name, distances, date, ?place)
             //todo: modelEvents
             filterView.on('modelChanged', function (model) {
                 applyFilter(model);
             });
             var applyFilter = function (model) {
                 var races = self.collection.toJSON();
                 if (model.get('startDate')) {
                     races = _.filter(races, function (item) {
                         var date;
                         if (item.date) {
                            var dateParts = item.date.split('.');
                            if (dateParts.length == 3) {
                                date = new Date(dateParts[1] + '.' + dateParts[0] + '.' + dateParts[2]);
                            }
                        }
                         
                        return date >= model.get('startDate');
                     });
                 }
                 if (model.get('endDate')) {
                     races = _.filter(races, function (item) {
                         var date;
                         if (item.date) {
                             var dateParts = item.date.split('.');
                             if (dateParts.length == 3) {
                                 date = new Date(dateParts[1] + '.' + dateParts[0] + '.' + dateParts[2]);
                             }
                         }

                         return date <= model.get('endDate');
                     });
                 }
                 if (model.get('categories').length > 0) {
                     var found = [];
                     _.each(model.get('categories'), function (category) {
                         var filtered = _.filter(races, function (item) {
                             return _.contains(item.categories, category);
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
                         return item.name.toLowerCase().indexOf(name.toLowerCase()) > -1;
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