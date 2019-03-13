//svg group hosting the legend
var legend = map.append("g")
  .attr("id", "legend");

//append all individual elements to the legend
legend.append("rect")
  .attr("x", 0)
  .attr("y", height/2)
  .attr("width", 110)
  .attr("height", height/2 - 20)
  .style("fill", "gainsboro")
  .attr("rx", 5)
  .attr("ry", 5);

legend.append("text")
  .text("LEGEND")
  .attr("x", 10)
  .attr("y", height/2 + 10)
  .attr("dy", ".7em")
  .attr("font-size", "12px")
  .attr("font-weight", "bold");

legend.append("text")
  .text("scroll/double click")
  .attr("x", 10)
  .attr("y", height/2 + 10)
  .attr("dy", "3em")
  .attr("font-size", "8px")
  .attr("font-weight", "bold");

legend.append("text")
  .text("to zoom")
  .attr("x", 10)
  .attr("y", height/2 + 10)
  .attr("dy", "4.1em")
  .attr("font-size", "8px")
  .attr("font-weight", "bold");

legend.append("text")
  .text("drag to pan")
  .attr("x", 10)
  .attr("y", height/2 + 10)
  .attr("dy", "5.5em")
  .attr("font-size", "8px")
  .attr("font-weight", "bold");

legend.append("text")
  .text("click on any route")
  .attr("x", 10)
  .attr("y", height/2 + 10)
  .attr("dy", "6.9em")
  .attr("font-size", "8px")
  .attr("font-weight", "bold");

legend.append("text")
  .text("for detail")
  .attr("x", 10)
  .attr("y", height/2 + 10)
  .attr("dy", "8em")
  .attr("font-size", "8px")
  .attr("font-weight", "bold");

legend.append("rect")
  .attr("x", 10)
  .attr("y", height/2 + 85.25)
  .attr("width", 15)
  .attr("height", 4.5)
  .attr("fill", "#1E3C9C");

legend.append("text")
  .text("rapid bus")
  .attr("x", 27.5)
  .attr("y", height/2 + 87.5)
  .attr("dy", ".35em")
  .attr("font-size", "8px")
  .attr("font-weight", "bold");

legend.append("rect")
  .attr("x", 10)
  .attr("y", height/2 + 95.25)
  .attr("width", 15)
  .attr("height", 4.5)
  .attr("fill", "#26B6EA");

legend.append("text")
  .text("blue light rail")
  .attr("x", 27.5)
  .attr("y", height/2 + 97.5)
  .attr("dy", ".35em")
  .attr("font-size", "8px")
  .attr("font-weight", "bold");

legend.append("rect")
  .attr("x", 10)
  .attr("y", height/2 + 105.25)
  .attr("width", 15)
  .attr("height", 4.5)
  .attr("fill", "#F79727");

legend.append("text")
  .text("orange light rail")
  .attr("x", 27.5)
  .attr("y", height/2 + 107.5)
  .attr("dy", ".35em")
  .attr("font-size", "8px")
  .attr("font-weight", "bold");

legend.append("rect")
  .attr("x", 10)
  .attr("y", height/2 + 115.25)
  .attr("width", 15)
  .attr("height", 4.5)
  .attr("fill", "#9FCE66");

legend.append("text")
  .text("green light rail")
  .attr("x", 27.5)
  .attr("y", height/2 + 117.5)
  .attr("dy", ".35em")
  .attr("font-size", "8px")
  .attr("font-weight", "bold");

legend.append("rect")
  .attr("x", 10)
  .attr("y", height/2 + 125.25)
  .attr("width", 15)
  .attr("height", 4.5)
  .attr("fill", "#7E3E98");

legend.append("text")
  .text("purple light rail")
  .attr("x", 27.5)
  .attr("y", height/2 + 127.5)
  .attr("dy", ".35em")
  .attr("font-size", "8px")
  .attr("font-weight", "bold");

legend.append("text")
  .text("Rapid bus and light rail")
  .attr("x", 10)
  .attr("y", height/2 + 140)
  .attr("dy", ".35em")
  .attr("font-size", "8px")
  .attr("font-weight", "bold");

legend.append("text")
  .text("stop only where shown")
  .attr("x", 10)
  .attr("y", height/2 + 150)
  .attr("dy", ".35em")
  .attr("font-size", "8px")
  .attr("font-weight", "bold");

legend.append("rect")
  .attr("x", 10)
  .attr("y", height/2 + 165)
  .attr("width", 15)
  .attr("height", 2)
  .attr("fill", "#EF3B39");

legend.append("text")
  .text("frequent local bus")
  .attr("x", 27.5)
  .attr("y", height/2 + 166)
  .attr("dy", ".35em")
  .attr("font-size", "8px")
  .attr("font-weight", "bold");

legend.append("text")
  .text("makes regular stops")
  .attr("x", 10)
  .attr("y", height/2 + 176)
  .attr("dy", ".35em")
  .attr("font-size", "8px")
  .attr("font-weight", "bold");

legend.append("circle")
  .attr("cx", 12.5)
  .attr("cy", height/2 + 188.5)
  .attr("r", 2.25)
  .attr("stroke", "black")
  .attr("stroke-width", .5)
  .attr("fill", "white");

legend.append("text")
  .text("rapid bus/light rail stop")
  .attr("x", 17.5)
  .attr("y", height/2 + 188.5)
  .attr("dy", ".35em")
  .attr("font-size", "8px")
  .attr("font-weight", "bold");

legend.append("circle")
  .attr("cx", 12.5)
  .attr("cy", height/2 + 198.5)
  .attr("r", 1)
  .attr("stroke", "black")
  .attr("stroke-width", .5)
  .attr("fill", "white");

legend.append("text")
  .text("local bus connection to")
  .attr("x", 17.5)
  .attr("y", height/2 + 198.5)
  .attr("dy", ".35em")
  .attr("font-size", "8px")
  .attr("font-weight", "bold");

legend.append("text")
  .text("rapid bus/light rail")
  .attr("x", 17.5)
  .attr("y", height/2 + 208.5)
  .attr("dy", ".35em")
  .attr("font-size", "8px")
  .attr("font-weight", "bold");
