(function(window, google) {
  
  // map options
  var options = {
    center: {
        lat: 55.753878,
        lng: 37.649275
    },
    zoom: 10
  },
  element = document.getElementById('map-canvas'),
  // map
  map = new google.maps.Map(element, options);
  
}(window, google));