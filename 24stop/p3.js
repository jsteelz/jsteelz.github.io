var dayWidth = 136;
var bufferWidth = 5;
var dayHeight = 25;

var days = ['M', 'T', 'W', 'T', 'F'];

//total height and width in px
//height: each day + top for hours + bottom for legend
var width = 720;
var height = dayHeight * 5 + 25;

var svg3 = d3.select("#p3")
            .attr("width", width)
            .attr("height", height);

var base3 = svg3.append("g");

var svg4 = d3.select("#p4")
            .attr("width", width)
            .attr("height", height);

var base4 = svg4.append("g");

var dayLabels3 = base3.append("g");

days.forEach(function (d, i) {
  dayLabels3.append("text")
    .text(d)
    .attr("font-size", "10px")
    .attr("text-anchor", "end")
    .attr("dy", ".35em")
    .attr("x", 15)
    .attr("y", i*dayHeight + 10);
});

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

//done with labels

//legend

var legend3 = base3.append("g");

var legend4 = base4.append("g");

legend3.append("text")
  .text("Legend: ")
  .attr("font-size", "12.5px")
  .attr("font-weight", "bold")
  .attr("text-anchor", "start")
  .attr("dy", ".35em")
  .attr("x", 0)
  .attr("y", 12.5 + 5 * dayHeight);

legend3.append("rect")
  .attr("fill", "#FF0000")
  .attr("x", 60)
  .attr("y", 5 + 5 * dayHeight)
  .attr("width", 15)
  .attr("height", 15);

legend3.append("text")
  .text("Scheduled more accurate")
  .attr("font-size", "12.5px")
  .attr("font-weight", "bold")
  .attr("x", 80)
  .attr("y", 12.5 + 5 * dayHeight)
  .attr("text-anchor", "start")
  .attr("dy", ".35em");

legend3.append("rect")
  .attr("fill", "#0000FF")
  .attr("x", 240)
  .attr("y", 5 + 5 * dayHeight)
  .attr("width", 15)
  .attr("height", 15);

legend3.append("text")
  .text("Real-time more accurate")
  .attr("font-size", "12.5px")
  .attr("font-weight", "bold")
  .attr("x", 260)
  .attr("y", 12.5 + 5 * dayHeight)
  .attr("text-anchor", "start")
  .attr("dy", ".35em");

legend3.append("rect")
  .attr("fill", "gainsboro")
  .attr("stroke", "white")
  .attr("x", 415)
  .attr("y", 5 + 5 * dayHeight)
  .attr("width", 15)
  .attr("height", 15);

legend3.append("text")
  .text("Equally accurate")
  .attr("font-size", "12.5px")
  .attr("font-weight", "bold")
  .attr("x", 435)
  .attr("y", 12.5 + 5 * dayHeight)
  .attr("text-anchor", "start")
  .attr("dy", ".35em");

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

//legend

//body
var bars2 = base3.append("g");

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

    if (tuple.diff_a_p > tuple.diff_a_s) {
      totals[day-5][0] += newTime - prevTime;
    }
    else if (tuple.diff_a_p < tuple.diff_a_s) {
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

    bars2.append("rect")
      .attr("x", 25)
      .attr("y", i*dayHeight)
      .attr("width", barScale(w1))
      .attr("height", 20)
      .attr("fill", "#FF0000");

    bars2.append("text")
      .text((w1*100).toFixed(0) + "%")
      .attr("font-size", "12.5px")
      .attr("font-weight", "bold")
      .attr("text-anchor", "middle")
      .attr("fill", "white")
      .attr("x", ((barScale(w1) + 25) + 25) / 2)
      .attr("y", i * dayHeight + 10)
      .attr("dy", ".35em");

    bars2.append("rect")
      .attr("x", 25 + barScale(w1))
      .attr("y", i*dayHeight)
      .attr("width", barScale(w2))
      .attr("height", 20)
      .attr("fill", "#0000FF");

    bars2.append("text")
      .text((w2*100).toFixed(0) + "%")
      .attr("font-size", "12.5px")
      .attr("font-weight", "bold")
      .attr("text-anchor", "middle")
      .attr("fill", "white")
      .attr("x", ((barScale(w1) + 25) +
                  (barScale(w1) + barScale(w2) + 25)) / 2)
      .attr("y", i * dayHeight + 10)
      .attr("dy", ".35em");

    bars2.append("rect")
      .attr("x", 25 + barScale(w1) + barScale(w2))
      .attr("y", i*dayHeight)
      .attr("width", barScale(w3))
      .attr("height", 20)
      .attr("fill", "gainsboro");

    if ((w3*100).toFixed(0) >= 5) {
      bars2.append("text")
        .text((w3*100).toFixed(0) + "%")
        .attr("font-size", "12.5px")
        .attr("font-weight", "bold")
        .attr("text-anchor", "middle")
        .attr("fill", "black")
        .attr("x", ((barScale(w1) + barScale(w2) + 25 +
                    barScale(w1) + barScale(w2) + barScale(w3) + 25) / 2))
        .attr("y", i * dayHeight + 10)
        .attr("dy", ".35em");
    }

  });
});

//body for second bar chart
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
