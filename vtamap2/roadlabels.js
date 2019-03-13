//the svg group containing the road labels
var roadNames = map.append("g");

//road lables format:text,cx,cy,rotation,textalign(h),textalign(v),routes
var roadLabels = [ ["el camino", 86.25, 63.75, 45, 'm', 'b', [22, 522]],
                   ["el camino", 297.5, 172.5, 0, 'm', 'i', [22, 522]],
                   ["alameda", 396.055, 189.768, 45, 'm', 'i', [22, 522]],
                   ["santa clara", 528.582, 194.954, -45, 'm', 'i', [22, 23, 66, 500, 522, 523]],
                   ["alum", 558.197, 151.197, -45, 'm', 'b', [23, 522]],
                   ["rock", 571.197, 138.197, -45, 'm', 'b', [23, 522]],
                   ["alum rock", 603.977, 112.487, -45, 'm', 'b', [25]],
                   ["white", 646.768, 133.232, 45, 'm', 'b', [25]],
                   ["story", 661.768, 174.697, -45, 'm', 'b', [25]],
                   ["story", 588.232, 248.232, -45, 'm', 'b', [25]],
                   ["keyes", 566.768, 276.768, -45, 'm', 'i', [25]],
                   ["willow", 501.906, 334.558, -45, 'm', 'b', [25]],
                   ["meridian", 467.5, 355, -90, 'm', 'b', [25]],
                   ["fruitdale", 445, 337.5, 0, 'm', 'b', [25]],
                   ["king", 588.536, 191.464, 45, 'm', 'b', [22, 77]],
                   ["tully", 665.138, 244.254, -45, 'm', 'b', [22, 26, 77]],
                   ["stevens", 345, 272.5, 0, 'm', 'i', [23, 523]],
                   ["creek", 345, 272.5, 0, 'm', 'di', [23, 523]],
                   ["stevens creek", 225, 262.5, 0, 'm', 'b', [23, 523]],
                   ["san carlos", 406.25, 272.5, 0, 'm', 'i', [23, 523]],
                   ["tully", 608.232, 308.232, -45, 'm', 'b', [26]],
                   ["bowers", 267.5, 113.75, -90, 'm', 'b', [57]],
                   ["kiely", 267.5, 220, -90, 'm', 'b', [57]],
                   ["saratoga", 238.232, 328.232, -45, 'm', 'b', [57]],
                   ["quito", 202.5, 400, -90, 'm', 'i', [57]],
                   ["allendale", 185, 432.5, 0, 'm', 'i', [57]],
                   ["lundy", 485, 76.35, -90, 'm', 'b', [60, 77]],
                   ["murphy", 470, 97.5, 0, 'm', 'b', [60]],
                   ["brokaw", 423.232, 113.232, -45, 'm', 'b', [60]],
                   ["benton", 365, 182.5, 0, 'm', 'i', [60]],
                   ["monroe", 352.5, 190, -90, 'r', 'i', [60]],
                   ["< market", 335, 197.5, 0, 'm', 'b', [60]],
                   ["bellomy >", 335, 202.5, 0, 'm', 'i', [60]],
                   ["winchester", 317.5, 235, -90, 'm', 'b', [60]],
                   ["winchester", 317.5, 350, -90, 'm', 'b', [60]],
                   ["taylor", 473.233, 147.929, -45, 'l', 'b', [61, 500]],
                   ["hedding", 437.045, 169.419, -45, 'r', 'b', [61]],
                   ["naglee", 390.732, 225.732, -45, 'm', 'b', [61]],
                   ["bascom", 367.5, 327.5, -90, 'm', 'b', [61]],
                   ["julian", 519.268, 164.268, -45, 'm', 'i', [64]],
                   ["6/7th", 500.442, 196.906, 45, 'm', 'b', [64]],
                   ["great", 462.5, 52.5, 0, 'm', 'i', [66]],
                   ["mall", 462.5, 52.5, 0, 'm', 'di', [66]],
                   ["oakland", 447.5, 75, -90, 'm', 'b', [66]],
                   ["10/11th", 485.732, 169.268, 45, 'm', 'i', [66, 500]],
                   ["1st", 545.768, 274.606, 45, 'm', 'b', [66, 68]],
                   ["monterey", 575.768, 304.606, 45, 'm', 'b', [66, 68]],
                   ["snell", 637.5, 401.187, -90, 'm', 'b', [66]],
                   ["santa teresa", 670, 462.5, 0, 'm', 'i', [66, 68]],
                   ["cottle", 667.5, 425, -90, 'm', 'b', [68]],
                   ["ocala", 657.942, 218.523, -45, 'm', 'b', [70]],
                   ["adrian", 638.232, 221.768, 45, 'm', 'i', [70]],
                   ["jackson", 601.768, 178.232, 45, 'm', 'b', [70]],
                   ["jackson", 539.268, 115.732, 45, 'm', 'b', [70]],
                   ["mabury", 516.580, 104.580, -45, 'm', 'b', [70]],
                   ["mclaughlin", 576.768, 213.232, 45, 'm', 'b', [72]],
                   ["mclaughlin", 661.768, 298.232, 45, 'm', 'b', [72]],
                   ["yerba buena", 671.768, 331.768, -45, 'l', 'i', [72]],
                   ["senter", 664.849, 367.5, 0, 'm', 'b', [72, 73]],
                   ["10/11th", 561.768, 238.232, 45, 'm', 'b', [73]],
                   ["senter", 606.768, 273.232, 45, 'm', 'b', [73]],
                   ["senter", 677.232, 350.768, 45, 'r', 'i', [72, 73]],
                   ["king", 523.826, 126.756, 45, 'm', 'b', [77, 523]],
                   ["capitol", 627.223, 157.777, 45, 'm', 'b', [522]],
                   ["mathilda", 176.25, 93.598, -90, 'm', 'b', [523]],
                   ["sunnyvale-saratoga", 176.25, 210, -90, 'm', 'b', [523]]
                 ];

//draw the road names
roadNames.selectAll("text")
   .data(roadLabels)
 .enter()
   .append("text")
   .attr("transform", function(d) { return "rotate(" + d[3] + " " + d[1] + " " + d[2] + ")"; })
   .attr("class", "roadNames")
   .text(function(d) { return d[0]; })
   .attr("x", function(d) { return d[1]; })
   .attr("y", function(d) { return d[2]; })
   .attr("text-anchor", function(d) { return textAnchor(d[4]); })
   .attr("dy", function(d) { return dy(d[5]); })
   .attr("font-size", "6px")
   .attr("font-weight", "bold");

//redraw road names once isolated via user click
function redrawRoadNames(d) {
  if (d.route instanceof String || typeof d.route === 'string') return;

  var tempg = map.append("g").attr("class", "temp");

  var roads = [];
  roadLabels.forEach(function(road) {
   if (road[6].includes(d.route)) roads.push(road);
  });

  roads.forEach(function(road) {
   tempg.append("text")
     .attr("transform", "rotate(" + road[3] + " " + road[1] + " " + road[2] + ")")
     .attr("class", "roadLabel")
     .text(road[0])
     .attr("x", road[1])
     .attr("y", road[2])
     .attr("text-anchor", textAnchor(road[4]))
     .attr("dy", dy(road[5]))
     .attr("font-size", "6px")
     .attr("font-weight", "bold");
  });

}
