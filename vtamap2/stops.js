//svg group for showing stops
var stops = map.append("g");

//stops of the size on light rail and rapid routes
var thickStops = [ {route: "Green",
                    stops: [ [270, 52.5, 12], [285, 52.5, 13], [300, 52.5, 14], [315, 52.5, 15], [331.464, 58.536, 16],
                             [345.464, 72.536, 17], [359.464, 86.536, 18], [373.464, 100.536, 19], [387.464, 114.536, 20],
                             [401.464, 128.536, 21], [416.464, 143.536, 22], [431.464, 158.536, 23], [446.464, 173.536, 24],
                             [461.464, 188.536, 25], [476.464, 203.536, 26], [493.812, 220.884, 27], [509.464, 236.536, 28],
                             [506.464, 256.464, 29], [487.5, 247.5, 51], [457.5, 245, 52], [440, 320, 53], [420, 340, 54],
                             [370, 390, 55], [360, 400, 56], [325, 435, 57], [315, 445, 58]
                           ]
                   },
                   {route: "Orange",
                    stops: [ [105, 47.5, 1], [120, 47.5, 2], [135, 47.5, 3], [150, 47.5, 4], [165, 47.5, 5], [180, 47.5, 6],
                             [195, 47.5, 7], [210, 47.5, 8], [225, 47.5, 9], [240, 47.5, 10], [255, 47.5, 11], [270, 47.5, 12],
                             [285, 47.5, 13], [300, 47.5, 14], [315, 47.5, 15], [352.5, 35, 40], [383.75, 35, 41],
                             [415, 35, 42], [446.25, 35, 43], [477.5, 35, 44], [503.536, 46.464, 45], [518.536, 61.464, 46],
                             [533.536, 76.464, 47], [548.536, 91.464, 48], [568.536, 111.464, 49], [593.536, 136.464, 50]
                           ]
                   },
                   {route: "Blue",
                    stops: [ [700, 450, 39], [670, 450, 38], [640, 430, 37], [610, 410, 36], [580, 400, 35], [580, 370, 34],
                             [580, 340, 33], [540, 300, 32], [525, 285, 31], [510, 270, 30], [510, 260, 29], [513, 233, 28],
                             [497.348, 217.348, 27], [480, 200, 26], [465, 185, 25], [450, 170, 24], [435, 155, 23],
                             [420, 140, 22], [405, 125, 21], [391, 111, 20], [377, 97, 19], [363, 83, 18], [349, 69, 17],
                             [335, 55, 16], [352.5, 40, 40], [383.75, 40, 41], [415, 40, 42], [446.25, 40, 43], [477.5, 40, 44],
                             [500, 50, 45], [515, 65, 46], [530, 80, 47], [545, 95, 48], [565, 115, 49], [590, 140, 50]
                           ]
                   },
                   {route: "Purple",
                    stops: [ [540, 440, 60], [560, 420, 59], [575, 400, 35] ]
                   },
                   {route: 500,
                    stops: [ [457.5, 236.25, 52], [482.5, 232.196, 61], [493.812, 220.884, 27], [507.348, 207.348, 62],
                             [482, 148, 63], [498.232, 131.767, 64]
                           ]
                   },
                   {route: 522,
                    stops: [ [42.652, 27.348, 65], [58.432, 43.128, 66], [74.213, 58.909, 67], [89.993, 74.689, 68],
                             [105.774, 90.470, 69], [135, 106.25, 70], [165.767, 120.463, 71], [180, 134.696, 72],
                             [195, 149.696, 73], [215, 166.25, 74], [242.5, 166.25, 75], [270, 166.25, 76], [325, 166.25, 77],
                             [387.652, 172.348, 78], [417.652, 202.348, 79], [440, 224.696, 80], [457.5, 236.25, 52],
                             [493.812, 220.884, 27], [507.348, 207.348, 62], [530.488, 184.208, 81], [540.976, 173.720, 82],
                             [551.464, 163.234, 83], [567.348, 147.348, 84], [597.072, 132.928, 50], [652.071, 187.929, 85],
                             [672.071, 207.929, 86], [697.071, 232.929, 87]
                           ]
                   },
                   {route: 523,
                    stops: [ [180, 52.5, 6], [180, 64.242, 88], [180, 75.984, 89], [180, 87.726, 90], [180, 99.469, 91],
                             [180, 111.211, 92], [180, 122.953, 93], [180, 134.696, 72], [180, 170, 94], [165, 250, 95],
                             [160, 262.5, 96], [180, 266.25, 97], [210, 266.25, 98], [240, 266.25, 99], [270, 266.25, 100],
                             [295, 266.25, 101], [320, 266.25, 102], [370, 266.25, 103], [440, 266.25, 104], [460, 266.25, 105],
                             [501.161, 251.161, 29], [504.161, 241.839, 28], [493.812, 220.884, 27], [507.348, 207.348, 62],
                             [530.488, 184.208, 81], [540.976, 173.720, 82], [551.464, 163.234, 83], [534.116, 145.884, 106],
                             [501.768, 128.232, 64]
                           ]
                   }
                 ];

//stops of the size on local routes
var thinStops = [ {route: 22,
                   stops: [ [40, 30, 65], [55.780, 45.780, 66], [71.561, 61.561, 67], [87.341, 77.341, 68],
                            [103.122, 93.122, 69], [135, 110, 70], [163.115, 123.115, 71], [176.5, 136.5, 72],
                            [192.348, 152.348, 73], [215, 170, 74], [242.5, 170, 75], [270, 170, 76], [325, 170, 77],
                            [385, 175, 78], [415, 205, 79], [437.348, 227.348, 80], [457.5, 240, 52], [485.152, 234.848, 61],
                            [493.813, 226.187, 27], [510, 210, 62], [533.140, 186.860, 81], [543.628, 176.372, 82],
                            [555, 165, 83], [690.885, 239.116, 87]
                          ]
                  },
                  {route: 23,
                   stops: [ [155, 270, 112], [180, 270, 97], [210, 270, 98], [240, 270, 99], [270, 270, 100],
                            [295, 270, 101], [320, 270, 102], [370, 270, 103], [440, 270, 104], [460, 270, 105],
                            [503.813, 253.813, 29], [506.813, 239.187, 28], [493.813, 226.187, 27], [510, 210, 62],
                            [533.140, 186.860, 81], [543.628, 176.372, 82], [555, 165, 83], [570, 150, 84],
                            [599.723, 130.277, 50]
                          ]
                  },
                  {route: 25,
                   stops: [ [372.25, 340, 111], [415.050, 340, 54], [537.348, 302.652, 32], [649.419, 190.581, 85],
                            [601.490, 128.510, 50]
                          ]
                  },
                  {route: 26,
                   stops: [ [582.652, 337.348, 33], [689.117, 240.884, 87] ]
                  },
                  {route: 57,
                   stops: [ [270, 56.25, 12], [270, 170, 76], [270, 270, 100], [170, 430, 108] ]
                  },
                  {route: 60,
                   stops: [ [312.348, 442.348, 58], [422.652, 137.348, 22], [385, 175, 78], [320, 270, 102],
                            [477.5, 43.75, 44]
                          ]
                  },
                  {route: 61,
                   stops: [ [496.464, 128.232, 64], [479.348, 145.348, 63], [452.652, 167.348, 24], [415, 205, 79],
                            [370, 270, 103], [370, 385.050, 55], [370, 440, 110]
                          ]
                  },
                  {route: 64,
                   stops: [ [580, 100, 109], [571.188, 108.812, 49], [536.768, 143.232, 106], [510, 210, 62],
                            [493.813, 226.187, 27], [485.152, 234.848, 61], [457.5, 240, 52]
                          ]
                  },
                  {route: 66,
                   stops: [ [475, 43.75, 44], [510, 210, 62], [493.813, 226.187, 27], [506.813, 239.187, 28],
                            [640, 434.950, 37], [667.5, 453.75, 38]
                          ]
                  },
                  {route: 68,
                   stops: [ [457.5, 240, 52], [485.152, 234.848, 61], [493.813, 226.187, 27], [506.813, 239.187, 28],
                            [670, 453.75, 38], [700, 453.75, 39]
                          ]
                  },
                  {route: 70,
                   stops: [ [694.420, 235.581, 87], [669.419, 210.581, 86], [570, 150, 84], [498.232, 126.464, 64] ]
                  },
                  {route: 72,
                   stops: [ [473.813, 206.187, 26], [493.813, 226.187, 27], [651.767, 377.070, 107] ]
                  },
                  {route: 73,
                   stops: [ [473.813, 206.187, 26], [493.813, 226.187, 27], [650, 378.838, 107] ]
                  },
                  {route: 77,
                   stops: [ [480, 43.75, 44], [496.464, 124.696, 64], [536.768, 143.232, 106], [556.768, 163.232, 83],
                            [692.652, 237.348, 87]
                          ]
                  }
                ];

//append data to stops svg group
var stopg = stops.selectAll("g")
    .data(thickStops);

//append a svg group to the existing stops group for light rail and rapid stops
var stopgEnter = stopg.enter()
  .append("g")
  .attr("class", "stop")
  .attr("id", function(d) { return "stops-" + d.route; });

//draw the thick stops
stopgEnter.selectAll("circle")
    .data(function(d) { return d.stops; })
  .enter()
    .append("circle")
    .attr("cx", function(d) { return d[0]; })
    .attr("cy", function(d) { return d[1]; })
    .attr("r", 2.25)
    .attr("stroke", "black")
    .attr("stroke-width", .5)
    .attr("fill", "white");

//append a new g for each set of local stops and draw the stops
thinStops.forEach(function(d) {
  var stopglocal = stops.append("g")
    .attr("class", "stop")
    .attr("id", "stops-" + d.route);
  d.stops.forEach(function(stop) {
    stopglocal.append("circle")
      .attr("cx", stop[0])
      .attr("cy", stop[1])
      .attr("r", 1)
      .attr("stroke", "black")
      .attr("stroke-width", .5)
      .attr("fill", "white");
  });
});

//redraw the stops once isolated via user click
function redrawStops(d) {
  var tempg = map.append("g").attr("class", "temp");
  if (d.route instanceof String || typeof d.route === 'string' || d.route >= 500) {
    var i = 0;
    while (thickStops[i].route != d.route) i++;
    var stops = thickStops[i].stops;

    stops.forEach(function(d) {
      tempg.append("circle")
        .attr("cx", d[0])
        .attr("cy", d[1])
        .attr("r", 2.25)
        .attr("stroke", "black")
        .attr("stroke-width", .5)
        .attr("fill", "white");

      redrawStopLabels(d[2], tempg)
    });
  } else {
    var i = 0;
    while (thinStops[i].route != d.route) i++;
    var stops = thinStops[i].stops;

    stops.forEach(function(d) {
      tempg.append("circle")
        .attr("cx", d[0])
        .attr("cy", d[1])
        .attr("r", 1)
        .attr("stroke", "black")
        .attr("stroke-width", .5)
        .attr("fill", "white");

      redrawStopLabels(d[2], tempg)
    });
  }
}
