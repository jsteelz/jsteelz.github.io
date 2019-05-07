function clear4() {
  d3.select("#s4").style("display", "none");
  d3.select("#map").selectAll("*").remove();
}

function draw4() {
  d3.select("#s4").style("display", "inline-block");

  document.getElementById('map').style.width= swidth + "px";
  document.getElementById('map').style.height= sheight + "px";

  mapboxgl.accessToken = 'pk.eyJ1IjoianN0ZWVsZTI4IiwiYSI6ImNqY3Yzd3g4bjBxbzYyenJ4bWZxaThheHgifQ.SQZJyv5Ep3RhGlGVtWXQ_g';
  //Sets the map up with the starting location, zoom, etc.
  var map = new mapboxgl.Map({
      container: 'map', // container id
      style: 'mapbox://styles/mapbox/light-v9', // stylesheet location
      center: [-77.0369, 38.9072], // starting position [lng, lat]
      zoom: 11.5, // starting zoom
      maxZoom: 17,
      minZoom: 10,
      maxBounds: [-77.1198, 38.7917, -76.9095, 38.9955],
      doubleClickZoom: false
  });

  map.on('load', function() {
    var url = 'files/metro.geojson';
    map.addSource('metro', { type: 'geojson', data: url});
    url = 'files/circ.json';
    map.addSource('circ', { type: 'geojson', data: url});
    url = 'files/bus.json';
    map.addSource('bus', { type: 'geojson', data: url});
    url = 'files/origs.geojson';
    map.addSource('origs', { type: 'geojson', data: url});
    url = 'files/dests.geojson';
    map.addSource('dests', { type: 'geojson', data: url});

    map.addLayer({
      "id": "circ",
      "type": "line",
      "source": "circ",
      "layout": {
        "line-join": "round",
        "line-cap": "round"
      },
      "paint": {
        "line-color": "blue",
        "line-width": 2
      }
    });

    map.addLayer({
      "id": "bus",
      "type": "line",
      "source": "bus",
      "layout": {
        "line-join": "round",
        "line-cap": "round"
      },
      "paint": {
        "line-color": "blue",
        "line-width": 2
      }
    });

    map.addLayer({
      "id": "metro",
      "type": "symbol",
      "source": "metro",
      "layout": {
        "icon-image": "rail-metro-11",
        "icon-size": 1.2
      }
    });

    map.addLayer({
      "id": "origs",
      "type": "circle",
      "source": "origs",
      "layout": {
        "visibility": "visible",
      },
      "paint": {
        'circle-radius': 1.5,
        "circle-color": 'yellow'
      }
    });

    map.addLayer({
      "id": "dests",
      "type": "circle",
      "source": "dests",
      "layout": {
        "visibility": "visible",
      },
      "paint": {
        'circle-radius': 1.5,
        "circle-color": 'red'
      }
    });

  });
}
