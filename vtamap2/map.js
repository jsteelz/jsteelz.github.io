//total height and width in px
var width = 750;
var height = 480;

//set viewport of svg to area where map elements are situated (scales to any screen)
var svg = d3.select("#map")
      .attr("viewBox", "0 -5 750 475");
//svg group containing zoomable elements of map
var map = svg.append("g");

//selected route (initiated to none)
var active = d3.select(null);

//tooltip to show route being hovered over
var tip;

function showTip() {
  tip = d3.select("body")
    .append("div")
    .attr("class", "tip")
    .style("display", "inline");
}

function moveTip(d) {
  var x = d3.event.pageX;
  var y = d3.event.pageY;
  tip.text(function() { return "Route " + d.route; })
    .style("color", function() {
      if (d.route < 500) return "#EF3B39";
      else return "#1E3C9C";
    })
    .style("left", (d3.event.pageX - 115) + "px")
    .style("top", (d3.event.pageY - 35) + "px");
}

function removeTip() {
  tip.style("display", "none");
}


//zoom behavior
var zoom = d3.behavior.zoom()
    .scaleExtent([1, 5])
    .on("zoom", zoomed);

svg.call(zoom);

//SHAMELESSLY TAKEN FROM STACKOVERFLOW
function zoomed() {
  // the "zoom" event populates d3.event with an object that has
  // a "translate" property (a 2-element Array in the form [x, y])
  // and a numeric "scale" property
  var e = d3.event,
      // now, constrain the x and y components of the translation by the
      // dimensions of the viewport
      tx = Math.min(0, Math.max(e.translate[0], width - width * e.scale)),
      ty = Math.min(0, Math.max(e.translate[1], height - height * e.scale));
  // then, update the zoom behavior's internal translation, so that
  // it knows how to properly manipulate it on the next movement
  zoom.translate([tx, ty]);
  // and finally, update the <g> element's transform attribute with the
  // correct translation and scale (in reverse order)
  map.attr("transform", [
    "translate(" + [tx, ty] + ")",
    "scale(" + e.scale + ")"
  ].join(" "));
}

//on user click
function clicked(d) {

  if (active[0][0] == null) {
    var toShade = map.selectAll("*");
    toShade.transition()
      .duration(750)
      .style("opacity", ".375")
      .each("end", function() { d3.select("#legend").style("opacity", "0"); });
  }

  map.selectAll(".temp").remove();

  var topExtRoutes = [523, 57, 66, 77, 60, 'Green', 'Blue'];

  //zoom.on("zoom", null);

  if (active.node() === this) return reset();

  d3.select(".zoomGuide")
    .style("display", "inline");

  active.classed("active", false);
  active = d3.select(this).classed("active", true);

  var path = d3.select("#path-" + d.route);
  var bounds = path.node().getBBox();

  var dx = bounds.width + 30,
      dy = bounds.height + 30;
  if (topExtRoutes.indexOf(d.route) > -1) dy = bounds.height + 65;

  var x = (bounds.x + bounds.x + bounds.width) / 2,
      y = (bounds.y + bounds.y + bounds.height) / 2;
  if (topExtRoutes.indexOf(d.route) > -1) y -= 7.5;
  if (d.route == 523 || d.route == 57) y -= 7.5;

  var scale = 1 / Math.max(dx / width, dy / height),
      translate = [width / 2 - scale * x, height / 2 - scale * y];

  if (scale < 1) scale = 1;

  redrawRoute(d);
  redrawStops(d);
  redrawRoadNames(d);

  zoom.translate(translate).scale(scale);

  map.transition()
      .duration(750)
      .attr("transform", "translate(" + translate + ")scale(" + scale + ")");
}

//on click back or re-click on route
function reset() {
  active.classed("active", false);
  active = d3.select(null);

  map.selectAll(".temp").remove();

  map.transition()
      .duration(750)
      .attr("transform", "");

  d3.select(".zoomGuide")
    .style("display", "none");

  var toShade = map.selectAll("*");

  toShade.transition()
    .duration(750)
    .style("opacity", "1");

  zoom.on("zoom", zoomed);
  zoom.translate([0, 0]).scale(1);
}
