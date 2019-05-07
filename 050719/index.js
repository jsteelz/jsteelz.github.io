var state = 0;

var tbar = document.getElementById("top-bar").getBoundingClientRect();
var w = tbar.width;
var swidth = w - 16;

var t = tbar.top;
var h = tbar.height;
var sheight = innerHeight - (t + h) - 10 - 15;

function draw1() {
  d3.select("#s1").style("display", "inline-block");

  var svg = d3.select("#i1")
    .attr("width", swidth)
    .attr("height", sheight);

  var base1 = svg.append("g");

  base1.append("rect")
    .text("VTA - Next Network Diagram")
    .attr("x", 1 * swidth / 8)
    .attr("y", sheight / 3 - 1)
    .attr("height", 2)
    .attr("width", 3 * swidth / 4);

  base1.append("circle")
    .attr("cx", 1 * swidth / 8)
    .attr("cy", sheight / 3)
    .attr("r", 10)
    .attr("fill", "blue")
    .attr("stroke", "black")
    .attr("stroke-width", 2);

  base1.append("circle")
    .attr("cx", 3 * swidth / 8)
    .attr("cy", sheight / 3)
    .attr("r", 10)
    .attr("fill", "blue")
    .attr("stroke", "black")
    .attr("stroke-width", 2);

  base1.append("circle")
    .attr("cx", 5 * swidth / 8)
    .attr("cy", sheight / 3)
    .attr("r", 10)
    .attr("fill", "blue")
    .attr("stroke", "black")
    .attr("stroke-width", 2);

  base1.append("circle")
    .attr("cx", 7 * swidth / 8)
    .attr("cy", sheight / 3)
    .attr("r", 10)
    .attr("fill", "blue")
    .attr("stroke", "black")
    .attr("stroke-width", 2);

  base1.append("text")
    .text("STM - Bus Reliability")
    .attr("x", 1 * swidth / 8)
    .attr("y", sheight / 3 + 25)
    .attr("dy", ".35em")
    .attr("text-anchor", "middle");

  base1.append("text")
    .text("VTA - Ridership Along 523 Alignment")
    .attr("x", 3 * swidth / 8)
    .attr("y", sheight / 3 + 25)
    .attr("dy", ".35em")
    .attr("text-anchor", "middle");

  base1.append("text")
    .text("D.C. - Scooter Usage Along Transit Routes")
    .attr("x", 5 * swidth / 8)
    .attr("y", sheight / 3 + 25)
    .attr("dy", ".35em")
    .attr("text-anchor", "middle");

  base1.append("text")
    .text("VTA - Next Network Diagram")
    .attr("x", 7 * swidth / 8)
    .attr("y", sheight / 3 + 25)
    .attr("dy", ".35em")
    .attr("text-anchor", "middle");
}

function clear1() {
  d3.selectAll("#i1").selectAll("*").remove();
  d3.select("#s1").style("display", "none");
}

function nextSlide() {
  if (state == 0) {
    draw1();
    d3.select("#slidenum").text("1/4");
    state += 1;
  } else if (state == 1) {
    clear1();
    draw2();
    d3.select("#slidenum").text("2/4");
    state += 1;
  } else if (state == 2) {
    clear2();
    draw3();
    d3.select("#slidenum").text("3/4");
    state += 1;
  } else if (state == 3) {
    clear3();
    draw4();
    d3.select("#slidenum").text("4/4");
    state += 1;
  } else if (state == 4) {
    window.open('https://jsteelz.github.io/vtamap2', '_blank');
  }
}

function prevSlide() {
  if (state == 1) {
    clear1();
    d3.select("#slidenum").text("0/4");
    state -= 1;
  } else if (state == 2) {
    clear2();
    draw1();
    d3.select("#slidenum").text("1/4");
    state -= 1;
  } else if (state == 3) {
    clear3();
    draw2();
    d3.select("#slidenum").text("2/4");
    state -= 1;
  } else if (state == 4) {
    clear4();
    draw3();
    d3.select("#slidenum").text("3/4");
    state -= 1;
  }
}

document.onkeydown = function(e) {
    switch (e.keyCode) {
        case 37:
            prevSlide();
            break;
        case 39:
            nextSlide();
            break;
    }
};
