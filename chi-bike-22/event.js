let activeDay = 0;
let activeDayEvent = 0;
let activeDayEventCount = 0;
let currentRouteLayer = null;
let currentWaypointLayer = null;

document.addEventListener('keydown', (ev) => {
  if (ev.keyCode === 37) { // left key
    incrementEvent();
  } else if (ev.keyCode === 39) { // right key
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
    if (activeDayEvent === 0) {
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
  currentRouteLayer = map.getLayer(`route-day-${activeDay}`);
  currentWaypointLayer = map.getLayer(`waypoints-day-${activeDay}`);
  activeDayEventCount = currentRouteLayer.features.length;
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