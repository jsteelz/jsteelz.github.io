//Code inspired by Mike Bostock
//THIS SECTION FOR THE MAP!

//width and height of montreal map
var w = 850,
    h = 700;

//the projection to use with d3 to put the geojson in svg
var projection = d3.geo.azimuthal()
    .mode("equidistant")
    .origin([-73.666631, 45.507370])
    .scale(120000)
    .translate([520, 450]);

//to scale the size of the dots in boroughs to the total number of outgoing trips
var dotScale = d3.scale.linear()
    .domain([1100, 209000])
    .range([2, 30]);

//to scale the size of the lines between boroughs to the number of outgoing trips to that borough
var lineScale = d3.scale.linear()
    .domain([700, 75000])
    .range([1, 15]);

//to scale the color of the boroughs to the percentage of outgoing trips taken with transit
var colorScale = d3.scale.linear()
    .domain([0, .5])
    .range(['white', '#e67300']);

//the checkbox element. used for when someone clicks on the text
var checkbox = document.getElementById("showBorough");

//switches between map views
function checkBox() {
  if (checkbox.checked == true) {
    d3.select(".map").selectAll("*").remove();
    showWithBoroughs();
  }
  else {
    d3.select(".map").selectAll("*").remove();
    showWithoutBoroughs();
  }
}

//the function that loads the svg with the borough backgrounds
function showWithBoroughs() {

  //renders a path into svg using the projection
  var path = d3.geo.path()
      .projection(projection);

  //get the svg element in html and set its height and width
  var svg = d3.select(".map")
      .attr("width", w)
      .attr("height", h);

  //the tip of arrows from boroughs to boroughs
  var lineTip = svg.append("marker")
      .attr("id", "arrowhead0")
      .attr("viewBox", "0 0 60 60")
      .attr("refX", "45")
      .attr("refY", "30")
      .attr("markerUnits", "strokeWidth")
      .attr("markerWidth", "5")
      .attr("markerHeight", "5")
      .attr("orient", "auto");

  lineTip.append("path")
      .attr("d", "M 0 0 L 60 30 L 0 60 z")
      .attr("fill", "#000");

  // Define the div for the tooltip
  var div = document.getElementById("hovertitle");

  // The group of elements associated with boroughs in montreal
  var boroughs = svg.append("svg:g")
      .attr("id", "boroughs");

  // The group of elements that are circles to hover for boroughs.
  var circles = svg.append("svg:g")
      .attr("id", "circles");

  //The group of elements that are voronoi cells
  var cells = svg.append("svg:g")
      .attr("id", "cells");

  //show the voronoi on checkbox
  d3.select("input[type=checkbox]").on("change", function() {
    cells.classed("voronoi", this.checked);
  });

  //read the main csv to get data
  d3.csv("mtlmvmt.csv", function(mvmts) {

    //arrays to hold the data from the csv
    var linksByOrigin = {},
        countByBorough = {},
        locationByBorough = {},
        positions = [];

    //function that creates a arc from borough to borough
    var arc = d3.geo.greatArc()
        .source(function(d) { return locationByBorough[d.source]; })
        .target(function(d) { return locationByBorough[d.target]; });

    //this populates the array of converted csv data
    mvmts.forEach(function(mvmt) {
      var origin = mvmt.origin,
          destination = mvmt.destination,
          count = mvmt.count,
          pct = mvmt.transitsharepct,
          links = linksByOrigin[origin] || (linksByOrigin[origin] = []);
      links.push({source: origin, target: destination, count: count, pct: pct});
      countByBorough[origin] = (countByBorough[origin] || 0) + parseInt(mvmt.count);
    });

    //gets the centroid of each borough
    d3.csv("boroughs.csv", function(boroughs) {

      // Only consider boroughs with at least one in/out.
      boroughs = boroughs.filter(function(borough) {
        if (countByBorough[borough.name]) {
          var location = [+borough.longitude, +borough.latitude];
          locationByBorough[borough.name] = location;
          positions.push(projection(location));
          return true;
        }
      });

      // Compute the Voronoi diagram of boroughs' projected positions.
      // necessary for when we hover over a point and change the data
      var polygons = d3.geom.voronoi(positions);

      //put a new element in the cells g
      var g = cells.selectAll("g")
          .data(boroughs)
        .enter().append("svg:g");

      g.append("svg:path")
          .attr("class", "cell")
          .attr("d", function(d, i) { return "M" + polygons[i].join("L") + "Z"; })
          .on("click", function(d, i) {
            d3.select("#graphtitle").text("Trips leaving " + d.name);
            d3.select("#graphlegend1").text("White bar = total trips.");
            d3.select("#graphlegend2").text("Orange bar = trips on transit. (% at end)");
            d3.select(".chart").selectAll("*").remove();
            updateTable(d.name);
          })
          .on("mouseover", function(d, i) {
            div.innerHTML = "<span>" + d.name + "</span><br/>Total trips: " + countByBorough[d.name];
          }).on("mouseout", function(d, i) {
            div.innerHTML = "";
          });

      //creates the lines between boroughs showing volumes of people and travel direction
      g.selectAll("path.arc")
          .data(function(d) { return linksByOrigin[d.name] || []; })
        .enter().append("svg:path")
          .attr("class", "arc")
          .attr("marker-end", function(d) {
            if (d.target != d.source) return "url(#arrowhead0)";
          })
          .attr("stroke-width", function(d) {
            return lineScale(d.count);
          })
          .attr("d", function(d) { return path(arc(d)); });

      //puts the circles in the map
      circles.selectAll("circle")
          .data(boroughs)
        .enter().append("svg:circle")
          .attr("cx", function(d, i) { return positions[i][0]; })
          .attr("cy", function(d, i) { return positions[i][1]; })
          .attr("r", function(d, i) { return dotScale(countByBorough[d.name]); })
          .attr("fill", 'white')
          .sort(function(a, b) { return countByBorough[b.name] - countByBorough[a.name]; });
    });

    //puts the boroughs on the map and color codes them by pct of outbound trips on transit
    d3.json("boroughs.json", function(collection) {
      boroughs.selectAll("path")
          .data(collection.features)
        .enter().append("svg:path")
          .attr("d", path)
          .attr("fill", function(d, i) {
            if (linksByOrigin[d.properties.NOM] == undefined) return 'white';
            else {
              var totalTrips = 0.00;
              var transitTrips = 0.00;
              linksByOrigin[d.properties.NOM].forEach(function(borough) {
                totalTrips += parseInt(borough.count);
                transitTrips += parseInt(borough.count) * parseInt(borough.pct) / 100.00;
              });
              return colorScale(transitTrips / totalTrips);
            }
          });
    });
  });
}

//defaults to showing without boroughs
showWithoutBoroughs();

//the function to scroll to the Villeray bar chart when the user clicks on the text
function showVilleray() {
  d3.select("#graphtitle").text("Trips leaving Villeray-Saint-Michel-Parc-Extension");
  d3.select("#graphlegend1").text("White bar = total trips.");
  d3.select("#graphlegend2").text("Orange bar = trips on transit. (% at end)");
  d3.select(".chart").selectAll("*").remove();
  updateTable("Villeray-Saint-Michel-Parc-Extension");
  document.getElementById('graphtitle').scrollIntoView();
}
