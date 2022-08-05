mapboxgl.accessToken = 'pk.eyJ1IjoianN0ZWVsZTI4IiwiYSI6ImNrYmtyc2ZyZDA2ejAydW1zaWZldGRsZ3MifQ.txe5BQOwSctEHqqntl8-Nw';
const NUM_DAYS = 13;
const EMOJI = [
  'cry',
  'curse',
  'facepalm',
  'gas',
  'grin',
  'hand-covering-mouth',
  'hotel',
  'house',
  'joy',
  'tent',
  'weary',
  'yum'
];

const map = new mapboxgl.Map({
  container: 'map', // container id
  style: {
    'version': 8,
    'sources': {
      'raster-tiles': {
        'type': 'raster',
        'tiles': [
          'https://stamen-tiles.a.ssl.fastly.net/terrain/{z}/{x}/{y}.png'
        ],
        'tileSize': 256,
        'attribution': 'Map tiles by <a target="_top" rel="noopener" href="http://stamen.com">Stamen Design</a>, under <a target="_top" rel="noopener" href="http://creativecommons.org/licenses/by/3.0">CC BY 3.0</a>. Data by <a target="_top" rel="noopener" href="http://openstreetmap.org">OpenStreetMap</a>, under <a target="_top" rel="noopener" href="http://creativecommons.org/licenses/by-sa/3.0">CC BY SA</a>'
      }
    },
    'layers': [
      {
        'id': 'simple-tiles',
        'type': 'raster',
        'source': 'raster-tiles',
        'minzoom': 0,
        'maxzoom': 22
      }
    ]
  },
});

map.on('load', () => {
  for (const emoji of EMOJI) {
    map.loadImage(`./img/${emoji}.png`, (error, image) => {
      if (error) {
        console.log('could not load image!');
      } else {
        map.addImage(emoji, image);
      }
    });
  }

  // separate for loops to load base route shape before loading waypoints
  // haha my index for num_days starts at 1 die mad cs nerds
  for (let i = 1; i <= NUM_DAYS; i += 1) {
    map.addSource(`route-day-${i}`, { type: 'geojson', data: `./geojson/route-day-${i}.geojson` });
    map.addLayer({
      "id": `route-day-${i}`,
      "type": "line",
      "source": `route-day-${i}`,
      "layout": {
        "line-join": "round",
        "line-cap": "round"
      },
      "paint": {
        "line-color": "#3d265e",
        "line-width": 2.5
      }
    });
  }
  for (let i = 1; i <= NUM_DAYS; i += 1) {
    map.addSource(`waypoints-day-${i}`, { type: 'geojson', data: `./geojson/waypoints-day-${i}.geojson` });
    map.addLayer({
      "id": `waypoints-day-${i}`,
      "type": "symbol",
      "source": `waypoints-day-${i}`,
      "layout": {
        "icon-image": ['get', 'marker-symbol'],
        "icon-size": .15,
        "icon-allow-overlap": true,
      }
    });

    map.on('click', `waypoints-day-${i}`, (e) => {
      // Copy coordinates array.
      const coordinates = e.features[0].geometry.coordinates.slice();
      const description = e.features[0].properties.description;
     
      // Ensure that if the map is zoomed out such that multiple
      // copies of the feature are visible, the popup appears
      // over the copy being pointed to.
      while (Math.abs(e.lngLat.lng - coordinates[0]) > 180) {
        coordinates[0] += e.lngLat.lng > coordinates[0] ? 360 : -360;
      }
     
      new mapboxgl.Popup()
        .setLngLat(coordinates)
        .setHTML(description)
        .addTo(map);
    });
    map.on('mouseenter', `waypoints-day-${i}`, () => {
      map.getCanvas().style.cursor = 'pointer';
    });

    map.on('mouseleave', `waypoints-day-${i}`, () => {
      map.getCanvas().style.cursor = '';
    });
  }

  map.fitBounds(
    new mapboxgl.LngLatBounds(
      [-73.565784,45.532977], 
      [-88.159968, 41.235421]
    ), 
    {
      padding: 20
    }
  );
});