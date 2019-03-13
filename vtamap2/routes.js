//create a line between two vertices
var line = d3.svg.line()
  .x(function(d) { return d[0]; })
  .y(function(d) { return d[1]; });

//svg groups by type of route
var localLines = map.append("g");
var rapidLines = map.append("g");
var lightRail = map.append("g");

//local route vertices
var localPoints = [ {route: 22,
                     vertices: [ [40, 30], [120, 110], [150, 110], [210, 170], [380, 170], [450, 240],
                                 [480, 240], [555, 165], [653.232, 263.232], [684.116, 232.348], [690.885, 239.116]
                               ]
                    },
                    {route: 23,
                     vertices: [ [155, 270], [487.626, 270], [512.626, 245], [493.813, 226.187],
                                 [594.723, 125.277], [599.723, 130.277]
                               ]
                    },
                    {route: 25,
                     vertices: [ [372.25, 340], [470, 340], [470, 370], [675, 165], [615, 105],
                                 [596.490, 123.510], [601.490, 128.510]
                               ]
                    },
                    {route: 26,
                     vertices: [ [582.652, 337.348], [680, 240], [684.116, 235.884], [689.117, 240.884] ]
                    },
                    {route: 57,
                     vertices: [ [270, 56.25], [270, 280], [280, 290], [200, 370], [200, 430], [170, 430] ]
                    },
                    {route: 60,
                     vertices: [ [312.348, 442.348], [320, 434.696], [320, 200], [350, 200], [350, 180], [380, 180],
                                 [422.652, 137.348], [412.652, 127.348], [440, 100], [487.5, 100], [487.5, 52.5],
                                 [477.5, 52.5], [477.5, 43.75]
                               ]
                    },
                    {route: 61,
                     vertices: [ [496.464, 128.232], [455, 169.696], [447.652, 162.348],
                                 [425, 185], [430, 190], [370, 250], [370, 440]
                               ]
                    },
                    {route: 64,
                     vertices: [ [580, 100], [490, 190], [510, 210], [480, 240], [457.5, 240] ]
                    },
                    {route: 66,
                     vertices: [ [475, 43.75], [475, 50], [450, 50], [450, 130], [520, 200], [493.813, 226.187],
                                 [640, 372.374], [640, 460], [667.5, 460], [667.5, 453.75]
                               ]
                    },
                    {route: 68,
                     vertices: [ [457.5, 240], [480, 240], [493.813, 226.187], [670, 402.374], [670, 460],
                                 [700, 460], [700, 453.75]
                               ]
                    },
                    {route: 70,
                     vertices: [ [694.420, 235.581], [669.419, 210.581], [650, 230], [522.348, 102.348], [498.232, 126.464]
                               ]
                    },
                    {route: 72,
                     vertices: [ [473.813, 206.187], [502.045, 234.419], [530, 206.464], [541.767, 218.232], [550, 210],
                                 [540, 200], [550, 190], [680, 320], [666.768, 333.232], [682.5, 348.964], [682.5, 372.5],
                                 [647.197, 372.5], [651.767, 377.070]
                               ]
                    },
                    {route: 73,
                     vertices: [ [473.813, 206.187], [503.813, 236.187], [530, 210], [581.768, 261.768], [586.768, 256.768],
                                 [680, 350], [680, 370], [641.162, 370], [650, 378.838]
                               ]
                    },
                    {route: 77,
                     vertices: [ [480, 43.75], [480, 50], [490, 50], [490, 100], [500, 110], [490, 120],
                                 [495.581, 125.580], [507.348, 113.815], [653.232, 259.699], [684.116, 228.815],
                                 [692.652, 237.348]
                               ]
                    }
                  ];
//rapid route vertices
var rapidPoints = [ {route: 500,
                     vertices: [ [498.232, 131.767], [477.652, 152.348], [520, 194.696], [478.446, 236.25], [457.5, 236.25] ]
                    },
                    {route: 522,
                     vertices: [ [42.652, 27.348], [121.554, 106.25], [151.554, 106.25], [211.554, 166.25],
                                 [381.554, 166.25], [451.554, 236.25], [478.446, 236.25], [552.348, 162.348],
                                 [589.419, 125.276], [604.420, 140.276], [697.071, 232.929]
                               ]
                    },
                    {route: 523,
                     vertices: [ [180, 52.5], [180, 250], [160, 250], [160, 266.25], [486.073, 266.25], [507.323, 245],
                                 [488.510, 226.187], [551.464, 163.234], [509.116, 120.886], [501.768, 128.232]
                               ]
                    }
                  ];
//light rail route vertices and their colors
var lightRailPoints = [ {route: "Blue",
                         color: "#26B6EA",
                         vertices: [ [700, 450], [660, 450], [620, 410], [580, 410],
                                     [580, 340], [505, 265], [525, 245], [330, 50],
                                     [340, 40], [490, 40], [590, 140]
                                   ]
                        },
                        {route: "Orange",
                         color: "#F79727",
                         vertices: [ [105, 47.5], [325.427, 47.5], [337.928, 35], [492.072, 35], [593.536, 136.464] ]
                        },
                        {route: "Green",
                         color: "#9FCE66",
                         vertices: [ [270, 52.5], [325.427, 52.5], [517.928, 245], [501.464, 261.464], [485, 245],
                                     [457.5, 245], [445, 257.5], [445, 315], [315, 445]
                                   ]
                        },
                        {route: "Purple",
                         color: "#7E3E98",
                         vertices: [ [540, 440], [575, 405], [575, 400] ]
                        }
                      ];

//draw the local routes
localLines.selectAll("path")
    .data(localPoints)
  .enter()
    .append("path")
    .attr("stroke", "#EF3B39")
    .attr("stroke-width", 2)
    .attr("fill", "none")
    .attr("id", function(d) { return "path-" + d.route; })
    .attr("class", "localLine")
    .attr("d", function(d) { return line(d.vertices); })
    .on("click", clicked)
    .on('mouseover', showTip)
    .on('mousemove', moveTip)
    .on('mouseout', removeTip);

//draw the rapid routes
rapidLines.selectAll("path")
    .data(rapidPoints)
  .enter()
    .append("path")
    .attr("stroke", "#1E3C9C")
    .attr("stroke-width", 4.5)
    .attr("fill", "none")
    .attr("id", function(d) { return "path-" + d.route; })
    .attr("class", "rapidLine")
    .attr("d", function(d) { return line(d.vertices); })
    .on("click", clicked)
    .on('mouseover', showTip)
    .on('mousemove', moveTip)
    .on('mouseout', removeTip);

//draw the light rail routes
lightRail.selectAll("path")
    .data(lightRailPoints)
  .enter()
    .append("path")
    .attr("stroke", function(d) { return d.color; })
    .attr("stroke-width", 4.5)
    .attr("fill", "none")
    .attr("id", function(d) { return "path-" + d.route; })
    .attr("class", "lightRail")
    .attr("d", function(d) { return line(d.vertices); })
    .on("click", clicked);

//redraw a route once isolated via user click
function redrawRoute(d) {
  var tempg = map.append("g").attr("class", "temp");
  if (d.route instanceof String || typeof d.route === 'string') {
    tempg.append("path")
      .attr("stroke", d.color)
      .attr("stroke-width", 4.5)
      .attr("fill", "none")
      .attr("id", "tempPath-" + d.route)
      .attr("class", "temp")
      .attr("d", line(d.vertices))
      .style("cursor", "pointer")
      .on("click", reset);
  } else if (d.route >= 500) {
    tempg.append("path")
      .attr("stroke", "#1E3C9C")
      .attr("stroke-width", 4.5)
      .attr("fill", "none")
      .attr("id", "path-" + d.route)
      .attr("class", "rapidLine")
      .attr("d", line(d.vertices))
      .style("cursor", "pointer")
      .on("click", reset);
  } else {
    tempg.append("path")
      .attr("stroke", "#EF3B39")
      .attr("stroke-width", 2)
      .attr("fill", "none")
      .attr("id", "tempPath-" + d.route)
      .attr("class", "temp")
      .attr("d", line(d.vertices))
      .style("cursor", "pointer")
      .on("click", reset);
  }
}
