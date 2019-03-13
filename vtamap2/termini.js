//the svg group with the terminus labels
var routeMarkers = map.append("g");

//terminus label locations and text alignments
var routeTips = [ {route: 22,
                   tips: [ [37.5, 30, 65, "r", "dbm"], [700.821, 232.929, 87, "l", "5bm"] ]
                  },
                  {route: 23,
                   tips: [ [] ]
                  },
                ];

//for each element of routeTips, create a svg subgroup for that route and draw the text
routeTips.forEach(function(tip) {
  var tipClass = routeMarkers.append("g")
    .attr("class", "routeTip")
    .attr("id", "routeTips-" + tip.route);

  tipClass.append("text")
    .text(tip.route)
    .attr("text-anchor", textAnchor(tip.tips[0][3]))
    .attr("dy", dy(tip.tips[0][4]))
    .style("fill", function() { if (tip.route < 500) return "#EF3B39"; else return "#1E3C9C"; })
    .attr("x", tip.tips[0][0])
    .attr("y", tip.tips[0][1])
    .attr("font-size", "6px")
    .attr("font-weight", "bold");

  tipClass.append("text")
    .text(tip.route)
    .attr("text-anchor", textAnchor(tip.tips[1][3]))
    .attr("dy", dy(tip.tips[1][4]))
    .style("fill", function() { if (tip.route < 500) return "#EF3B39"; else return "#1E3C9C"; })
    .attr("x", tip.tips[1][0])
    .attr("y", tip.tips[1][1])
    .attr("font-size", "6px")
    .attr("font-weight", "bold");
});
