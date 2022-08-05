mapboxgl.accessToken = 'pk.eyJ1IjoianN0ZWVsZTI4IiwiYSI6ImNqY3Yzd3g4bjBxbzYyenJ4bWZxaThheHgifQ.SQZJyv5Ep3RhGlGVtWXQ_g';
const NUM_DAYS = 13;

const map = new mapboxgl.Map({
  container: 'map', // container id
  style: 'mapbox://styles/mapbox/light-v9', // stylesheet location
});

map.on('load', () => {
  // separate for loops to load base route shape before loading waypoints
  for (let i = 1; i <= NUM_DAYS; i += 1) {
    map.addSource(`route-day-${i}`, { type: 'geojson', data: `./geojson/route-day-${i}` });
    map.addLayer({
      "id": `route-day-${i}`,
      "type": "line",
      "source": `route-day-${i}`,
      "layout": {
        "line-join": "round",
        "line-cap": "round"
      },
      "paint": {
        "line-color": "blue", // fix
        "line-width": 2
      }
    });
  }
  for (let i = 1; i <= NUM_DAYS; i += 1) {
    map.addSource(`waypoints-day-${i}`, { type: 'geojson', data: `./geojson/waypoints-day-${i}` });
    map.addLayer({
      "id": `waypoints-day-${i}`,
      "type": "symbol",
      "source": `waypoints-day-${i}`,
      "layout": {
        "icon-image": "bicycle",
        "icon-size": 1.2
      }
    });
  }
});