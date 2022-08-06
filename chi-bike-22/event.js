const DEFAULT_PAGE_HTML = `
<div id="title">
jsteelz
</div>
<div id="subtitle">
this is my bike trip from seattle to chicago as best i remember it
</div>
<div id="menu">
you can let me tell you the story (just use the ⬅️➡️ buttons)
<br>you can peruse by day
<br>or you can just click on anything on the map and get its description, i guess
</div>
`;

const END_PAGE_HTML = `
<div id="title">
jsteelz
</div>
<div id="subtitle">
that was my bike trip from seattle to chicago as best i remember it
</div>
<div id="story">
hope u enjoyed it
</div>
<div id="reset-button" onclick="loadStart()">
reset
</div>
`;

const DAY_INFO = [
  '', // DAYS INDEX STARTS AT 1 LMFAOOOO
  'woof',
  'broad shoulders make me weak 🥺',
  'beaucoup hills.',
  'headwindy wet fart section of ny state',
  'i felt like a piece of detritus trying to extricate myself from a clogged vacuum cleaner',
  'much better',
  'into ohio we go',
  'rest day',
  'chill day',
  'an ode to fenders - and to flatlands coffee',
  'indiana has hills oops',
  'the great gig in the dry',
  'windy city indeed'
];

let activeDay = 0;
let activeDayEvent = 0;
let activeDayEventCount = 0;
let currentWaypointData = null;
let currentPopup = null;

document.addEventListener('keydown', (ev) => {
  if (ev.keyCode === 39) { // left key
    incrementEvent();
  } else if (ev.keyCode === 37) { // right key
    decrementEvent();
  }
});

function incrementEvent() {
  if (activeDay === 0) {
    loadNextDay();
  } else if (activeDay === NUM_DAYS && activeDayEvent === activeDayEventCount - 1) {
    loadEnd();
  } else if (activeDayEvent === activeDayEventCount - 1) {
    loadNextDay();
  } else {
    loadNextEvent();
  }
}

function decrementEvent() {
  if (activeDay > 0) {
    if (activeDayEvent === 0 && activeDay === 1) {
      loadStart();
    } else if (activeDayEvent === 0) {
      loadLastEventFromYesterday();
    } else {
      loadPreviousEvent();
    }
  }
}

function loadNextDay() {
  activeDay += 1;
  activeDayEvent = 0;
  showOnlyLayersOfDay(activeDay);
  fetch(`./geojson/waypoints-day-${activeDay}.geojson`)
    .then(response => response.json())
    .then((json) => {
      currentWaypointData = json.features;
      activeDayEventCount = json.features.length;
      displayEvent();
    });
}

function loadStart() {
  activeDay = 0;
  activeDayEvent = 0;
  activeDayEventCount = 0;
  currentWaypointData = null;
  if (currentPopup) {
    currentPopup.remove();
  }
  currentPopup = null;
  document.getElementById('text').innerHTML = DEFAULT_PAGE_HTML;
  document.getElementById('side-image').innerHTML = '';
  map.fitBounds(
    new mapboxgl.LngLatBounds(
      [-73.565784,45.532977], 
      [-88.159968, 41.235421]
    ), 
    {
      padding: 20
    }
  );
  showAllLayers();
}

function loadEnd() {
  if (currentPopup) {
    currentPopup.remove();
  }
  document.getElementById('side-image').innerHTML = '';
  document.getElementById('text').innerHTML = END_PAGE_HTML;
  map.fitBounds(
    new mapboxgl.LngLatBounds(
      [-73.565784,45.532977], 
      [-88.159968, 41.235421]
    ), 
    {
      padding: 20
    }
  );
  showAllLayers();
}

function loadNextEvent() {
  activeDayEvent += 1;
  displayEvent();
}

function loadLastEventFromYesterday() {
  activeDay -= 1;
  showOnlyLayersOfDay(activeDay);
  fetch(`./geojson/waypoints-day-${activeDay}.geojson`)
    .then(response => response.json())
    .then((json) => {
      currentWaypointData = json.features;
      activeDayEventCount = json.features.length;
      activeDayEvent = activeDayEventCount - 1;
      displayEvent();
    });
}

function loadPreviousEvent() {
  activeDayEvent -= 1;
  displayEvent();
}

function showOnlyLayersOfDay(dayNumber) {
  for (let i = 1; i <= NUM_DAYS; i += 1) {
    map.setLayoutProperty(
      `route-day-${i}`,
      'visibility',
      dayNumber === i ? 'visible' : 'none'
    );
    map.setLayoutProperty(
      `waypoints-day-${i}`,
      'visibility',
      dayNumber === i ? 'visible' : 'none'
    );
  }
}

function showAllLayers() {
  for (let i = 1; i <= NUM_DAYS; i += 1) {
    map.setLayoutProperty(
      `route-day-${i}`,
      'visibility',
      'visible'
    );
    map.setLayoutProperty(
      `waypoints-day-${i}`,
      'visibility',
      'visible'
    );
  }
}

function displayEvent() {
  if (currentPopup) {
    currentPopup.remove();
  }
  currentPopup = new mapboxgl.Popup()
    .setLngLat(currentWaypointData[activeDayEvent].geometry.coordinates.slice())
    .setHTML(currentWaypointData[activeDayEvent].properties.title)
    .addTo(map);
  
  map.setCenter(currentWaypointData[activeDayEvent].geometry.coordinates.slice());
  map.setZoom(13);
  document.getElementById('text').innerHTML = `
<div id="title">
jsteelz
</div>
<div id="subtitle">
day ${activeDay} "${DAY_INFO[activeDay]}"
</div>
<div id="story-title">
${EMOJI[currentWaypointData[activeDayEvent].properties['marker-symbol']]} ${currentWaypointData[activeDayEvent].properties.title}
</div>
<div id="story">
${currentWaypointData[activeDayEvent].properties.description || ''}
</div>
<div id="reset-button">
<span onclick="loadStart()">reset</span>
</div>
`;

  document.getElementById('side-image').innerHTML = `
${currentWaypointData[activeDayEvent].properties.image ?
`
<a target="_blank" href="./img/${currentWaypointData[activeDayEvent].properties.image}.jpg">
<img src="./img/${currentWaypointData[activeDayEvent].properties.image}-small.jpg">
</a>
`
  : ''}
  `;
}
