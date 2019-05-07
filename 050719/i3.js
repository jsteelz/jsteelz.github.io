//COMMON VARIABLES FOR ALL .JS FILES

var margin = 30;

var ridershipScale = d3.scale.linear()
  .domain([0, 916])
  .range([2, 40]);

function tooltip(map, d) {
  if (map == '23') {
    document.getElementById('stop23').style.display = 'inline';
    document.getElementById('stop23').innerHTML = "<strong>" + d[0] + "<br/></strong> <span>" + d[3] + " b/wd</span>";
  }
}

function clearTool(map) {
  if (map == '23') {
    document.getElementById('stop23').style.display = 'none';
  }
}

//END COMMON VARIABLES FOR ALL .JS FILES

function clear3() {
  d3.select("#s3").style("display", "none");
  d3.select("#map_53").selectAll("*").remove();
  d3.select("#map_54_1").selectAll("*").remove();
  d3.select("#map_55").selectAll("*").remove();
  d3.select("#map_523_55").selectAll("*").remove();
}

function draw3() {
  d3.select("#s3").style("display", "inline-block");

  var map53 = d3.select("#map_53")
        .attr("width", swidth / 5)
        .attr("viewBox", "0 0 175 360");
  var map54 = d3.select("#map_54_1")
        .attr("width", swidth / 5)
        .attr("viewBox", "0 0 175 360");
  var map55 = d3.select("#map_55")
        .attr("width", swidth / 5)
        .attr("viewBox", "0 0 175 360");
  var map523_2 = d3.select("#map_523_55")
        .attr("width", swidth / 5)
        .attr("viewBox", "0 0 175 360");

  map53.append("text")
        .text("53: 277 b/wd")
        .attr("class", "svgtitle")
        .attr("text-anchor", "middle")
        .attr("x", 175/2.0)
        .attr("y", 15);

  map54.append("text")
        .text("54: 348 b/wd")
        .attr("class", "svgtitle")
        .attr("text-anchor", "middle")
        .attr("x", 175/2.0)
        .attr("y", 15);

  map55.append("text")
        .text("55-Only Stops: 324 b/wd")
        .attr("class", "svgtitle")
        .attr("text-anchor", "middle")
        .attr("x", 175/2.0)
        .attr("y", 15);

  map523_2.append("text")
        .text("55/523 Stops: 304 b/wd")
        .attr("class", "svgtitle")
        .attr("text-anchor", "middle")
        .attr("x", 175/2.0)
        .attr("y", 15);

  var linepoints53 = [ [3, 13], [3, 11], [2, 11], [2, 6], [1, 6], [1, 1], [5, 1], [5, 0] ];
  var linepoints54 = [ [2, 13], [2, 2], [3, 2], [3, 1], [4, 1], [4, 0] ];
  var linepoints55 = [ [2.5, 13], [0.5, 13], [0.5, 15], [2.5, 15], [2.5, 6], [4.5, 6], [5.5, 5], [5.5, 3], [2.5, 3], [2.5, 0] ];
  var linepoints523_1 = [ [4, 13], [2, 13], [2, 11], [4, 11], [4, 0] ];

  var scale2 = d3.scale.linear()
      .domain([0, 15])
      .range([margin, 360-margin]);

  var line2 = d3.svg.line()
                  .x(function(d) { return scale2(d[0]); })
                  .y(function(d) { return scale2(d[1]); });

  map53.append("path")
        .attr("stroke", "#147DC0")
        .attr("stroke-width", 2.5)
        .attr("fill", "none")
        .attr("d", line2(linepoints53));

  map54.append("path")
        .attr("stroke", "#147DC0")
        .attr("stroke-width", 2.5)
        .attr("fill", "none")
        .attr("d", line2(linepoints54));

  map55.append("path")
        .attr("stroke", "#147DC0")
        .attr("stroke-width", 2.5)
        .attr("fill", "none")
        .attr("d", line2(linepoints55));

  map523_2.append("path")
        .attr("stroke", "#F89738")
        .attr("stroke-width", 2.5)
        .attr("fill", "none")
        .attr("d", line2(linepoints523_1));

  var stops53 = [ ['Sunnyvale Transit Center', 5, 0, 22],
                  ['Washington & Charles', 4.6, 1, 4],
                  ['Washington & Pastoria', 4.0, 1, 4],
                  ['Washington & Carson', 3.4, 1, 8],
                  ['Washington & Matadero', 2.8, 1, 0],
                  ['Washington & Mary', 2.2, 1, 7],
                  ['Washington & Leota', 1.6, 1, 10],
                  ['Washington & Bernardo', 1, 1, 31],
                  ['Bernardo & Iowa', 1, 1.833, 6],
                  ['Bernardo & El Camino', 1, 2.667, 25],
                  ['Bernardo & Brookfield', 1, 3.5, 4],
                  ['Bernardo & Heatherstone', 1, 4.333, 6],
                  ['Bernardo & Knickerbocker', 1, 5.167, 2],
                  ['Bernardo & Remington', 1, 6, 7],
                  ['Remington & Mango', 1.5, 6, 15],
                  ['Remington & Mary', 2, 6, 27],
                  ['Mary & Ticonderoga', 2, 7, 2],
                  ['Mary & Fremont', 2, 8, 5],
                  ['Mary & Cascade', 2, 8.75, 2],
                  ['Mary & The Dalles', 2, 9.5, 1],
                  ['Mary & Helena', 2, 10.25, 2],
                  ['Mary & Homestead', 2, 11, 60],
                  ['Homestead & Kennewick', 2.5, 11, 17],
                  ['Homestead & Stelling', 3, 11, 13],
                  ['Stelling & Gardena', 3, 11.4, 2],
                  ['Stelling & Greenleaf', 3, 11.8, 2],
                  ['Stelling & Hazelbrook', 3, 12.2, 3],
                  ['Stelling & Christensen', 3, 12.6, 2],
                  ['Stelling & Stevens Creek', 3, 13, 27] ];

  var stops54 = [ ['Sunnyvale Transit Center', 4, 0, 44],
                  ['Washington & Mathilda', 3, 1, 4],
                  ['Mathilda & Iowa', 3, 1.5, 4],
                  ['Mathilda & Olive', 3, 2, 29],
                  ['Hollenbeck & El Camino', 2, 2, 49],
                  ['Hollenbeck & Danforth', 2, 3.333, 6],
                  ['Hollenbeck & Harvard', 2, 4.667, 6],
                  ['Hollenbeck & Remington', 2, 6, 2],
                  ['Hollenbeck & Torrington', 2, 7, 6],
                  ['Hollenbeck & Fremont', 2, 8, 19],
                  ['Hollenbeck & Cascade', 2, 8.6, 6],
                  ['Hollenbeck & The Dalles', 2, 9.2, 11],
                  ['Hollenbeck & Grand Coulee', 2, 9.8, 10],
                  ['Hollenbeck & Homestead', 2, 10.4, 5],
                  ['Stelling & Homestead', 2, 11, 41],
                  ['Stelling & Gardena', 2, 11.4, 5],
                  ['Stelling & Greenleaf', 2, 11.8, 6],
                  ['Stelling & Hazelbrook', 2, 12.2, 2],
                  ['Stelling & Christensen', 2, 12.6, 0],
                  ['Stelling & Stevens Creek', 2, 13, 101] ];

  var stops55 = [ ['Sunnyvale & McKinley', 2.5, 1, 17],
                  ['Sunnyvale & Olive', 2.5, 2, 3],
                  ['Old San Francisco & Central', 3, 3, 18],
                  ['Old San Francisco & Fair Oaks', 5.5, 3, 30],
                  ['Fair Oaks & Iris', 5.5, 5, 35],
                  ['Fair Oaks & El Camino', 5, 5.5, 82],
                  ['Fair Oaks & Manet', 4.5, 6, 20],
                  ['Fair Oaks & Azure', 3.5, 6, 23],
                  ['Sunnyvale-Saratoga & Crescent', 2.5, 7, 4],
                  ['Sunnyvale-Saratoga & Cheyenne', 2.5, 8.75, 5],
                  ['Sunnyvale-Saratoga & Alberta', 2.5, 9.5, 9],
                  ['Sunnyvale-Saratoga & La Conner', 2.5, 10.25, 7],
                  ['De Anza & Mariani', 2.5, 11.667, 7],
                  ['De Anza & Lazaneo', 2.5, 12.333, 2],
                  ['De Anza & Sunrise', 2.5, 13.667, 4],
                  ['Stevens Creek & Saich', 1.5, 13, 2],
                  ['De Anza & Pacifica', 2.5, 14.333, 4],
                  ['McClellan & Felton', 2, 15, 3],
                  ['McClellan & Stelling', 0.5, 15, 5],
                  ['Stelling & Pepper Tree', 0.5, 14, 44] ];

  var stops523 = [ ['Stevens Creek & De Anza', 4, 13, 31],
                   ['Stelling & Stevens Creek', 2, 13, 32],
                   ['Sunnyvale-Saratoga & Homestead', 4, 11, 28],
                   ['Sunnyvale-Saratoga & Fremont', 4, 8, 53],
                   ['Sunnyvale-Saratoga & Remington', 4, 6, 5],
                   ['Sunnyvale & El Camino', 4, 3, 47],
                   ['Sunnyvale Transit Center', 4, 0, 109] ];

  var circles_53 = map53.selectAll("circle")
                   .data(stops53)
                 .enter()
                   .append("circle")
                   .attr("cx", function(d) { return scale2(d[1]); })
                   .attr("cy", function(d) { return scale2(d[2]); })
                   .attr("r", function(d) { return ridershipScale(d[3]); })
                   .attr("stroke-width", 1)
                   .attr("stroke", "#147DC0")
                   .style("fill", "white")
                   .on("mouseover", function(d) { tip53(d, map53); })
                   .on("mouseout", function(d) { remove53(map53); });

  var circles_54 = map54.selectAll("circle")
                    .data(stops54)
                  .enter()
                    .append("circle")
                    .attr("cx", function(d) { return scale2(d[1]); })
                    .attr("cy", function(d) { return scale2(d[2]); })
                    .attr("r", function(d) { return ridershipScale(d[3]); })
                    .attr("stroke-width", 1)
                    .attr("stroke", "#147DC0")
                    .style("fill", "white")
                    .on("mouseover", function(d) { tip53(d, map53); })
                    .on("mouseout", function(d) { remove53(map53); });

  var circles_55 = map55.selectAll("circle")
                    .data(stops55)
                  .enter()
                    .append("circle")
                    .attr("cx", function(d) { return scale2(d[1]); })
                    .attr("cy", function(d) { return scale2(d[2]); })
                    .attr("r", function(d) { return ridershipScale(d[3]); })
                    .attr("stroke-width", 1)
                    .attr("stroke", "#147DC0")
                    .style("fill", "white")
                    .on("mouseover", function(d) { tip55(d, map523_2); })
                    .on("mouseout", function(d) { remove55(map523_2); });

  var circles523_55 = map523_2.selectAll("circle")
                      .data(stops523)
                    .enter()
                      .append("circle")
                      .attr("cx", function(d) { return scale2(d[1]); })
                      .attr("cy", function(d) { return scale2(d[2]); })
                      .attr("r", function(d) { return ridershipScale(d[3]); })
                      .attr("stroke-width", 1)
                      .attr("stroke", "#F89738")
                      .style("fill", "white")
                      .on("mouseover", function(d) { tip55(d, map523_2); })
                      .on("mouseout", function(d) { remove55(map523_2); });
}

function tip53(d, map53) {
  map53.append("text")
    .text(d[0])
    .attr("class", "tip53")
    .attr("text-anchor", "start")
    .attr("x", 15)
    .attr("y", 330);
  map53.append("text")
    .text(d[3] + " b/wd")
    .attr("class", "tip53")
    .attr("text-anchor", "start")
    .attr("x", 15)
    .attr("y", 345);
}

function remove53(map53) {
  map53.selectAll('.tip53').remove();
}

function tip55(d, map523_2) {
  map523_2.append("text")
    .text(d[0])
    .attr("class", "tip55")
    .attr("text-anchor", "end")
    .attr("x", 160)
    .attr("y", 330);
  map523_2.append("text")
    .text(d[3] + " b/wd")
    .attr("class", "tip55")
    .attr("text-anchor", "end")
    .attr("x", 160)
    .attr("y", 345);
}

function remove55(map523_2) {
  map523_2.selectAll('.tip55').remove();
}
