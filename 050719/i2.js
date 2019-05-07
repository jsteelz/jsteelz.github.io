function calcDayHeight(datum, dayHeight) {
  return dayHeight * (parseInt(datum.split("-")[2]) - 4)
}

function color(toColor) {
  switch(toColor) {
    case -1:
      return "gainsboro";
    case 0:
      return "#0000FF";
    case 5:
      return "#FFFF00";
    default:
      return "#FF0000";
  }
}

function clear2() {
  d3.select("#s2").style("display", "none");
  d3.selectAll("#p1").selectAll("*").remove();
  d3.selectAll("#p3").selectAll("*").remove();
}

function draw2() {
  d3.select("#s2").style("display", "inline-block");

  var dayWidth = 136;
  var bufferWidth = 5;
  var dayHeight = 25;

  var days = ['M', 'T', 'W', 'T', 'F'];
  // var barScale = d3.scale.linear()
  //     .domain([0, 1])
  //     .range([0, 700]);

  //total height and width in px
  //height: each day + top for hours + bottom for legend
  var width = swidth - 50;
  var height = dayHeight * 5 + 25 + 25;

  var svg = d3.select("#p1")
              .attr("width", width)
              .attr("height", height);

  var boxScale = d3.scale.linear()
      .domain([21600, 75600])
      .range([25, width - 10]);

  var barScale = d3.scale.linear()
    .domain([0, 1])
    .range([0, width - 10]);

  // var height2 = dayHeight * 5 + 25;
  //
  // var svg2 = d3.select("#p2")
  //             .attr("width", width)
  //             .attr("height", height2);

  //main group of svg for all elements
  // var base2 = svg2.append("g");

  //main group of svg for all elements
  var base = svg.append("g");

  //tooltip to show timeslot being hovered over
  var tip;

  function showTip() {
    tip = d3.select("body")
      .append("div")
      .attr("class", "tip")
      .style("display", "inline");
  }

  // function moveTip(d) {
  //   var x = d3.event.pageX;
  //   var y = d3.event.pageY;
  //   tip.text(function() { return "Route " + d.route; })
  //     .style("color", function() {
  //       if (d.route < 500) return "#EF3B39";
  //       else return "#1E3C9C";
  //     })
  //     .style("left", (d3.event.pageX - 115) + "px")
  //     .style("top", (d3.event.pageY - 35) + "px");
  // }
  //
  // function removeTip() {
  //   tip.style("display", "none");
  // }

  //SECTION FOR SIDE/TOP LABELS

  var dayLabels = base.append("g");

  days.forEach(function (d, i) {
    dayLabels.append("text")
      .text(d)
      .attr("font-size", "10px")
      .attr("text-anchor", "end")
      .attr("dy", ".35em")
      .attr("x", 15)
      .attr("y", i*dayHeight + 10 + 25);
  });

  // var dayLabels2 = base2.append("g");

  // days.forEach(function (d, i) {
  //   dayLabels2.append("text")
  //     .text(d)
  //     .attr("font-size", "10px")
  //     .attr("text-anchor", "end")
  //     .attr("dy", ".35em")
  //     .attr("x", 15)
  //     .attr("y", i*dayHeight + 10);
  // });

  var hourLabels = base.append("g");

  for (var i = 6; i < 22; i++) {
    hourLabels.append("text")
      .text(i)
      .attr("font-size", "10px")
      .attr("text-anchor", "middle")
      .attr("dy", ".35em")
      .attr("x", boxScale(i * 60 * 60))
      .attr("y", 15);
  }

  //SECTION FOR LEGEND

  var legend = base.append("g");

  //Adds a text element to the svg
  legend.append("text")
    .text("Legend: ")
    .attr("font-size", "12.5px")
    .attr("font-weight", "bold")
    .attr("text-anchor", "start")
    .attr("dy", ".35em")
    .attr("x", 0)
    .attr("y", 25 + 12.5 + 5 * dayHeight);

  //Adds a rectangle element to the svg
  legend.append("rect")
    .attr("fill", "#FF0000")
    .attr("x", 60)
    .attr("y", 25 + 5 + 5 * dayHeight)
    .attr("width", 15)
    .attr("height", 15);

  legend.append("text")
    .text("10+ min wait")
    .attr("font-size", "12.5px")
    .attr("font-weight", "bold")
    .attr("x", 80)
    .attr("y", 25 + 12.5 + 5 * dayHeight)
    .attr("text-anchor", "start")
    .attr("dy", ".35em");

  legend.append("rect")
    .attr("fill", "#FFFF00")
    .attr("x", 165)
    .attr("y", 25 + 5 + 5 * dayHeight)
    .attr("width", 15)
    .attr("height", 15);

  legend.append("text")
    .text("5-10 min wait")
    .attr("font-size", "12.5px")
    .attr("font-weight", "bold")
    .attr("x", 185)
    .attr("y", 25 + 12.5 + 5 * dayHeight)
    .attr("text-anchor", "start")
    .attr("dy", ".35em");

  legend.append("rect")
    .attr("fill", "#0000FF")
    .attr("x", 275)
    .attr("y", 25 + 5 + 5 * dayHeight)
    .attr("width", 15)
    .attr("height", 15);

  legend.append("text")
    .text("<5 min wait")
    .attr("font-size", "12.5px")
    .attr("font-weight", "bold")
    .attr("x", 295)
    .attr("y", 25 + 12.5 + 5 * dayHeight)
    .attr("text-anchor", "start")
    .attr("dy", ".35em");

  legend.append("rect")
    .attr("fill", "gainsboro")
    .attr("stroke", "white")
    .attr("x", 375)
    .attr("y", 25 + 5 + 5 * dayHeight)
    .attr("width", 15)
    .attr("height", 15);

  legend.append("text")
    .text("no data")
    .attr("font-size", "12.5px")
    .attr("font-weight", "bold")
    .attr("x", 395)
    .attr("y", 25 + 12.5 + 5 * dayHeight)
    .attr("text-anchor", "start")
    .attr("dy", ".35em");

  // var legend2 = base2.append("g");
  //
  // legend2.append("text")
  //   .text("Legend: ")
  //   .attr("font-size", "12.5px")
  //   .attr("font-weight", "bold")
  //   .attr("text-anchor", "start")
  //   .attr("dy", ".35em")
  //   .attr("x", 0)
  //   .attr("y", 12.5 + 5 * dayHeight);
  //
  // legend2.append("rect")
  //   .attr("fill", "#FF0000")
  //   .attr("x", 60)
  //   .attr("y", 5 + 5 * dayHeight)
  //   .attr("width", 15)
  //   .attr("height", 15);
  //
  // legend2.append("text")
  //   .text("10+ min wait")
  //   .attr("font-size", "12.5px")
  //   .attr("font-weight", "bold")
  //   .attr("x", 80)
  //   .attr("y", 12.5 + 5 * dayHeight)
  //   .attr("text-anchor", "start")
  //   .attr("dy", ".35em");
  //
  // legend2.append("rect")
  //   .attr("fill", "#FFFF00")
  //   .attr("x", 165)
  //   .attr("y", 5 + 5 * dayHeight)
  //   .attr("width", 15)
  //   .attr("height", 15);
  //
  // legend2.append("text")
  //   .text("5-10 min wait")
  //   .attr("font-size", "12.5px")
  //   .attr("font-weight", "bold")
  //   .attr("x", 185)
  //   .attr("y", 12.5 + 5 * dayHeight)
  //   .attr("text-anchor", "start")
  //   .attr("dy", ".35em");
  //
  // legend2.append("rect")
  //   .attr("fill", "#0000FF")
  //   .attr("x", 275)
  //   .attr("y", 5 + 5 * dayHeight)
  //   .attr("width", 15)
  //   .attr("height", 15);
  //
  // legend2.append("text")
  //   .text("<5 min wait")
  //   .attr("font-size", "12.5px")
  //   .attr("font-weight", "bold")
  //   .attr("x", 295)
  //   .attr("y", 12.5 + 5 * dayHeight)
  //   .attr("text-anchor", "start")
  //   .attr("dy", ".35em");
  //
  // legend2.append("rect")
  //   .attr("fill", "gainsboro")
  //   .attr("stroke", "white")
  //   .attr("x", 375)
  //   .attr("y", 5 + 5 * dayHeight)
  //   .attr("width", 15)
  //   .attr("height", 15);
  //
  // legend2.append("text")
  //   .text("no data")
  //   .attr("font-size", "12.5px")
  //   .attr("font-weight", "bold")
  //   .attr("x", 395)
  //   .attr("y", 12.5 + 5 * dayHeight)
  //   .attr("text-anchor", "start")
  //   .attr("dy", ".35em");

  //SECTION FOR INTERVALS

  // var bars = base2.append("g");

  // function drawBars(t) {
  //   t.forEach(function (d, i) {
  //     w1 = d[0]*1.0 / d[4];
  //     w2 = d[1]*1.0 / d[4];
  //     w3 = d[2]*1.0 / d[4];
  //     w4 = d[3]*1.0 / d[4];
  //
  //     bars.append("rect")
  //       .attr("x", 25)
  //       .attr("y", i*dayHeight)
  //       .attr("width", barScale(w1))
  //       .attr("height", 20)
  //       .attr("fill", "#0000FF");
  //
  //     bars.append("text")
  //       .text((w1*100).toFixed(0) + "%")
  //       .attr("font-size", "12.5px")
  //       .attr("font-weight", "bold")
  //       .attr("text-anchor", "middle")
  //       .attr("fill", "white")
  //       .attr("x", ((barScale(w1) + 25) + 25) / 2)
  //       .attr("y", i * dayHeight + 10)
  //       .attr("dy", ".35em");
  //
  //     bars.append("rect")
  //       .attr("x", 25 + barScale(w1))
  //       .attr("y", i*25)
  //       .attr("width", barScale(w2))
  //       .attr("height", 20)
  //       .attr("fill", "#FFFF00");
  //
  //     bars.append("text")
  //       .text((w2*100).toFixed(0) + "%")
  //       .attr("font-size", "12.5px")
  //       .attr("font-weight", "bold")
  //       .attr("text-anchor", "middle")
  //       .attr("x", ((barScale(w1) + 25) +
  //                   (barScale(w1) + barScale(w2) + 25)) / 2)
  //       .attr("y", i * dayHeight + 10)
  //       .attr("dy", ".35em");
  //
  //     bars.append("rect")
  //       .attr("x", 25 + barScale(d[0]*1.0 / d[4]) + barScale(d[1]*1.0 / d[4]))
  //       .attr("y", i*25)
  //       .attr("width", barScale(d[2]*1.0 / d[4]))
  //       .attr("height", 20)
  //       .attr("fill", "#FF0000");
  //
  //     bars.append("text")
  //       .text((w3*100).toFixed(0) + "%")
  //       .attr("font-size", "12.5px")
  //       .attr("font-weight", "bold")
  //       .attr("text-anchor", "middle")
  //       .attr("fill", "white")
  //       .attr("x", ((barScale(w1) + barScale(w2) + 25 +
  //                   barScale(w1) + barScale(w2) + barScale(w3) + 25) / 2))
  //       .attr("y", i * dayHeight + 10)
  //       .attr("dy", ".35em");
  //
  //     bars.append("rect")
  //       .attr("x", 25 + barScale(d[0]*1.0 / d[4]) + barScale(d[1]*1.0 / d[4]) +
  //                       barScale(d[2]*1.0 / d[4]))
  //       .attr("y", i*25)
  //       .attr("width", barScale(d[3]*1.0 / d[4]))
  //       .attr("height", 20)
  //       .attr("fill", "gainsboro");
  //
  //     if ((w4*100).toFixed(0) > 2) {
  //       bars.append("text")
  //         .text((w4*100).toFixed(0) + "%")
  //         .attr("text-anchor", "middle")
  //         .attr("font-size", "12.5px")
  //         .attr("font-weight", "bold")
  //         .attr("x", ((barScale(w1) + barScale(w2) + barScale(w3) + 25 +
  //                     barScale(w1) + barScale(w2) + barScale(w3) + barScale(w4) + 25) / 2))
  //         .attr("y", i * dayHeight + 10)
  //         .attr("dy", ".35em");
  //     }
  //   });
  // }

  var boxes = base.append("g");

  d3.csv("files/output.txt", function(d) {
    var intervals = [];
    var lastTime = 6*60*60;
    var lastWait = 10;

    var prevLineTime = 21600;
    var prevLineDate = "2018-11-05";

    d.forEach(function(row) {
      var date = row.timestamp.split(" ")[0];
      var timeT = row.timestamp.split(" ")[1].split(":");
      var time = (parseInt(timeT[0]) * 60 * 60) + (parseInt(timeT[1]) * 60.0)
                  + parseInt(timeT[2]);

      if (date != prevLineDate) {
        intervals.push([prevLineDate, lastTime, prevLineTime, lastWait]);
        prevLineDate = date;
        lastWait = 10;
        lastTime = time;
        prevLineTime = time;
      }

      else if (time - prevLineTime > 70) {
        intervals.push([prevLineDate, lastTime, prevLineTime, lastWait]);
        intervals.push([prevLineDate, prevLineTime, time, -1]);
        prevLineTime = time;
        lastTime = time;
        if (row.next_arr - time > 10*60) lastWait = 10;
        else if (row.next_arr - time > 5*60) lastWait = 5;
        else lastWait = 0;
      }

      else {
        if (row.next_arr - time > 10*60) {
          if (lastWait != 10) {
            intervals.push([date, lastTime, time, lastWait]);
            lastTime = time;
            lastWait = 10;
          }
        }

        else if (row.next_arr - time > 5*60) {
          if (lastWait != 5) {
            intervals.push([date, lastTime, time, lastWait]);
            lastTime = time;
            lastWait = 5;
          }
        }

        else {
          if (lastWait != 0) {
            intervals.push([date, lastTime, time, lastWait]);
            lastTime = time;
            lastWait = 0;
          }
        }

        prevLineTime = time;
      }

    });

    intervals.forEach(function (d) {
      //draw in first visualization
      boxes.append("rect")
        .attr("x", boxScale(d[1]))
        .attr("y", calcDayHeight(d[0], dayHeight))
        .attr("width", boxScale(d[2]) - boxScale(d[1]))
        .attr("height", 20)
        .attr("fill", color(d[3]));
    });

    // var t = [ [0, 0, 0, 0, 0], [0, 0, 0, 0, 0], [0, 0, 0, 0, 0], [0, 0, 0, 0, 0],
    //           [0, 0, 0, 0, 0]];
    // var prevDay = 5;
    // var i = 0;
    //
    // intervals.forEach(function (d, c, a) {
    //   //calculate for second visualization
    //   var day = parseInt(d[0].split("-")[2]);
    //
    //   if (day != prevDay) {
    //     i++;
    //     prevDay++;
    //   }
    //
    //   if ((d[1] >= 10*60*60 && d[2] <= 17*60*60) ||
    //       (d[1] < 10*60*60 && d[2] > 10*60*60) ||
    //       (d[1] < 17*60*60 && d[2] > 17*60*60)) {
    //     var timeToAdd = 0;
    //
    //     if (d[1] >= 10*60*60 && d[2] <= 17*60*60) timeToAdd = d[2] - d[1];
    //     else if (d[1] < 10*60*60 && d[2] > 10*60*60) timeToAdd = d[2] - 10*60*60;
    //     else timeToAdd = 17*60*60 - d[1];
    //
    //     t[i][4] += timeToAdd;
    //
    //     switch(d[3]) {
    //       case -1:
    //         t[i][3] += timeToAdd;
    //         break;
    //       case 0:
    //         t[i][0] += timeToAdd;
    //         break;
    //       case 5:
    //         t[i][1] += timeToAdd;
    //         break;
    //       default:
    //         t[i][2] += timeToAdd;
    //         break;
    //     }
    //   }
    //
    //   if (c + 1 === a.length) drawBars(t);
    //
    // });

  });

  var svg4 = d3.select("#p3")
            .attr("width", width)
            .attr("height", height);

  var base4 = svg4.append("g");

  var dayLabels4 = base4.append("g");

  days.forEach(function (d, i) {
    dayLabels4.append("text")
      .text(d)
      .attr("font-size", "10px")
      .attr("text-anchor", "end")
      .attr("dy", ".35em")
      .attr("x", 15)
      .attr("y", i*dayHeight + 10);
  });

  var legend4 = base4.append("g");

  legend4.append("text")
  .text("Legend: ")
  .attr("font-size", "12.5px")
  .attr("font-weight", "bold")
  .attr("text-anchor", "start")
  .attr("dy", ".35em")
  .attr("x", 0)
  .attr("y", 12.5 + 5 * dayHeight);

  legend4.append("rect")
    .attr("fill", "#0000FF")
    .attr("x", 60)
    .attr("y", 5 + 5 * dayHeight)
    .attr("width", 15)
    .attr("height", 15);

  legend4.append("text")
    .text("Within 1 min of real arrival")
    .attr("font-size", "12.5px")
    .attr("font-weight", "bold")
    .attr("x", 80)
    .attr("y", 12.5 + 5 * dayHeight)
    .attr("text-anchor", "start")
    .attr("dy", ".35em");

  legend4.append("rect")
    .attr("fill", "#FFFF00")
    .attr("x", 245)
    .attr("y", 5 + 5 * dayHeight)
    .attr("width", 15)
    .attr("height", 15);

  legend4.append("text")
    .text("Within 2 min")
    .attr("font-size", "12.5px")
    .attr("font-weight", "bold")
    .attr("x", 265)
    .attr("y", 12.5 + 5 * dayHeight)
    .attr("text-anchor", "start")
    .attr("dy", ".35em");

  legend4.append("rect")
    .attr("fill", "#FF0000")
    .attr("x", 345)
    .attr("y", 5 + 5 * dayHeight)
    .attr("width", 15)
    .attr("height", 15);

  legend4.append("text")
    .text("Inaccurate by more than 2 min")
    .attr("font-size", "12.5px")
    .attr("font-weight", "bold")
    .attr("x", 365)
    .attr("y", 12.5 + 5 * dayHeight)
    .attr("text-anchor", "start")
    .attr("dy", ".35em");

  var bars3 = base4.append("g");

  d3.csv("files/output.txt", function(d) {
    var totals = [[0, 0, 0, 0], [0, 0, 0, 0], [0, 0, 0, 0], [0, 0, 0, 0],
                  [0, 0, 0, 0]];

    var prevTime = 6*60*60.0;
    var day = 5;

    d.forEach(function(tuple) {
      newTimeArray = tuple.timestamp.split(" ")[1].split(":");
      newTime = parseInt(newTimeArray[0])*60*60.0 + parseInt(newTimeArray[1])*60.0
                + parseInt(newTimeArray[2]);

      if (+(tuple.timestamp.split(" ")[0].split("-")[2]) != day) {
        prevTime = 6*60*60.0;
        day++;
      }

      if (Math.abs(tuple.next_pred - tuple.next_arr) <= 60) {
        totals[day-5][0] += newTime - prevTime;
      }
      else if (Math.abs(tuple.next_pred - tuple.next_arr) <= 120) {
        totals[day-5][1] += newTime - prevTime;
      } else {
        totals[day-5][2] += newTime - prevTime;
      }

      totals[day-5][3] += newTime - prevTime;

      prevTime = newTime;
    });

    totals.forEach(function(total, i) {
      w1 = total[0]*1.0 / total[3];
      w2 = total[1]*1.0 / total[3];
      w3 = total[2]*1.0 / total[3];

      bars3.append("rect")
        .attr("x", 25)
        .attr("y", i*dayHeight)
        .attr("width", barScale(w1))
        .attr("height", 20)
        .attr("fill", "#0000FF");

      bars3.append("text")
        .text((w1*100).toFixed(0) + "%")
        .attr("font-size", "12.5px")
        .attr("font-weight", "bold")
        .attr("text-anchor", "middle")
        .attr("fill", "white")
        .attr("x", ((barScale(w1) + 25) + 25) / 2)
        .attr("y", i * dayHeight + 10)
        .attr("dy", ".35em");

      bars3.append("rect")
        .attr("x", 25 + barScale(w1))
        .attr("y", i*dayHeight)
        .attr("width", barScale(w2))
        .attr("height", 20)
        .attr("fill", "#FFFF00");

      bars3.append("text")
        .text((w2*100).toFixed(0) + "%")
        .attr("font-size", "12.5px")
        .attr("font-weight", "bold")
        .attr("text-anchor", "middle")
        .attr("x", ((barScale(w1) + 25) +
                    (barScale(w1) + barScale(w2) + 25)) / 2)
        .attr("y", i * dayHeight + 10)
        .attr("dy", ".35em");

      bars3.append("rect")
        .attr("x", 25 + barScale(w1) + barScale(w2))
        .attr("y", i*dayHeight)
        .attr("width", barScale(w3))
        .attr("height", 20)
        .attr("fill", "#FF0000");

      bars3.append("text")
        .text((w3*100).toFixed(0) + "%")
        .attr("font-size", "12.5px")
        .attr("font-weight", "bold")
        .attr("text-anchor", "middle")
        .attr("fill", "white")
        .attr("x", ((barScale(w1) + barScale(w2) + 25 +
                    barScale(w1) + barScale(w2) + barScale(w3) + 25) / 2))
        .attr("y", i * dayHeight + 10)
        .attr("dy", ".35em");
    });

  });
}
