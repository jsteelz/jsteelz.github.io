//the function to show the map without borough backgrounds
function showWithoutBoroughs() {

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
      // necessary for showing the user when click
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

      //puts the circles in the map and uses colorscale to color them appropriately
      circles.selectAll("circle")
          .data(boroughs)
        .enter().append("svg:circle")
          .attr("cx", function(d, i) { return positions[i][0]; })
          .attr("cy", function(d, i) { return positions[i][1]; })
          .attr("r", function(d, i) { return dotScale(countByBorough[d.name]); })
          .attr("fill", function(d, i) {
            if (linksByOrigin[d.name] == undefined) return 'white';
            else {
              var totalTrips = 0.00;
              var transitTrips = 0.00;
              linksByOrigin[d.name].forEach(function(borough) {
                totalTrips += parseInt(borough.count);
                transitTrips += parseInt(borough.count) * parseInt(borough.pct) / 100.00;
              });
              return colorScale(transitTrips / totalTrips);
            }
          })
          .sort(function(a, b) { return countByBorough[b.name] - countByBorough[a.name]; });
    });
  });
}
