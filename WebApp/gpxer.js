window.onload = function () {
    var WGS84 = new OpenLayers.Projection("EPSG:4326");
    var Mercator = new OpenLayers.Projection("EPSG:900913");

    function handleFile(file) {
        if (file.name.split('.').pop() == 'tcx') {
            return;
        }
        var reader = new FileReader();
        reader.onload = function (evt) {
            if (evt.error) {
                readerror();
                return;
            }

            var results = null;
            var content = evt.target.result;
            var engine;
            var formats = ['KML', 'GPX', 'OSM'];
            for (var i = 0; i < formats.length; i++) {
                engine = new OpenLayers.Format[formats[i]]({
                    internalProjection: Mercator,
                    externalProjection: WGS84,
                    extractStyles: true
                });
                try {
                    results = engine.read(content);
                } catch (e) { }
                if (results && results.length) {
                    break;
                }
            }
            if (!results || !results.length) {
                readerror();
                return;
            }
            
            viewLayer.addFeatures(results);
            map.zoomToExtent(viewLayer.getDataExtent());
        };
        reader.readAsText(file);
    }

    function dragHandler(event) {
        event.stopPropagation();
        event.preventDefault();

        var drop_area = document.getElementById("map2");
        drop_area.className = "area drag";
    }

    function filesDroped(event) {
        event.stopPropagation();
        event.preventDefault();
        var drop_area = document.getElementById("map2");
        drop_area.className = "area";

        var files = event.dataTransfer.files; //It returns a FileList object
        var filesInfo = "";

        for (var i = 0; i < files.length; i++) {
            var file = files[i];
            viewLayer.destroyFeatures();
            handleFile(file);
        }
    }

    this.map = new OpenLayers.Map('map2');
    var baseLayer = new OpenLayers.Layer.OSM("");

    var viewLayer = new OpenLayers.Layer.Vector("ViewLayer", {
        projection: WGS84,
        styleMap: new OpenLayers.StyleMap({
            fillColor: "blue",
            strokeColor: "blue",
            strokeWidth: 3
        }),
        attribution: "<span id='attribution'>Example adapted from <a href='http://renevier.net/misc/mapfileapi.html' target='_blank'>renevier.net</a></span>"
    });

    map.addLayers([baseLayer, viewLayer]);
    var switcher = new OpenLayers.Control.LayerSwitcher();
    map.addControl(switcher);
    switcher.maximizeControl();
    var lonlat = new OpenLayers.LonLat(0, 0).transform(WGS84, Mercator);
    map.setCenter(lonlat, 3);
    //Check File API support
    if (window.File && window.FileList) {
        var drop_area = document.getElementById("map2");

        drop_area.addEventListener("dragover", dragHandler);
        drop_area.addEventListener("drop", filesDroped);

    }
    else {
        console.log("Your browser does not support File API");
    }
}