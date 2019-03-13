function updateTable(borough) {

  var width = 850,
      barHeight = 17;

  var barScale = d3.scale.linear()
      .range([0, width - 450]);

  var chart = d3.select(".chart")
      .attr("width", width);

  d3.csv("mtlmvmt.csv", function(data) {

    //only get data with borough that user clicked on as origin
    data = data.filter(function(datum) {
      if (datum.origin == borough) return true;
    });

    //sort in order from high to low of number of trips
    data.sort(function (l, r) {
        return r.count - l.count;
    });

    barScale.domain([0, d3.max(data, function(d) { return parseInt(d.count); })]);

    //set height to number of destinations times height of one bar
    chart.attr("height", barHeight * data.length);

    //define the variable to access and update g elements
    var bar = chart.selectAll("g")
        .data(data);

    //remove all existing g elements
    bar.exit()
      .remove();

    //offset the width by 300, and the height of the bar by the ith position in the dataset
    bar.enter().append("g")
        .attr("transform", function(d, i) { return "translate(300," + i * barHeight + ")"; });

    //append white bar using scale for number of trips
    bar.append("rect")
        .attr("class", "bar")
        .attr("width", function(d) { return barScale(parseInt(d.count)); })
        .attr("height", barHeight - 1);

    //append orange bar for transit trips using same scale
    bar.append("rect")
        .attr("class", "pctbar")
        .attr("width", function(d) { return barScale(parseInt(d.count) * parseInt(d.transitsharepct) / 100); })
        .attr("height", barHeight - 1);

    //appends percentage and count labels at end of bar
    bar.append("text")
      .text(function(d) { return d.transitsharepct + "%, " + d.count; })
        .attr("x", function(d) { return barScale(parseInt(d.count)) + 1; }) //1px after end of white bar
        .attr("y", barHeight / 2)
        .attr("dy", ".35em");

    //append name of borough at start of bar
    bar.append("text")
      .text(function(d) { return d.destination; })
        .attr("class", "label")
        .attr("x", -5)
        .attr("y", barHeight / 2)
        .attr("dy", ".35em")
        .attr("max-width", 95);
  });

}
