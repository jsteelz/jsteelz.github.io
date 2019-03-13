//svg groups for stop labels and for the shadow behind them when they overlap routes
var stopShade = map.append("g");
var stopText = map.append("g");

//all stop labels format: name,cx,cy,rotation,textalign(h),textalign(v),id,display,shadow
var stopLabels = [ ["MOUNTAIN VIEW", 105, 43.75, -45, 'l', 'b', 1, true],
                   ["WHISMAN", 120, 43.75, -45, 'l', 'b', 2, true],
                   ["MIDDLEFIELD", 135, 43.75, -45, 'l', 'b', 3, true],
                   ["BAYSHORE/NASA", 150, 43.75, -45, 'l', 'b', 4, true],
                   ["MOFFETT PARK", 165, 43.75, -45, 'l', 'b', 5, true],
                   ["LOCKHEED MARTIN", 180, 43.75, -45, 'l', 'b', 6, true],
                   ["BORREGAS", 195, 43.75, -45, 'l', 'b', 7, true],
                   ["CROSSMAN", 210, 43.75, -45, 'l', 'b', 8, true],
                   ["FAIR OAKS", 225, 43.75, -45, 'l', 'b', 9, true],
                   ["VIENNA", 240, 43.75, -45, 'l', 'b', 10, true],
                   ["REAMWOOD", 255, 43.75, -45, 'l', 'b', 11, true],
                   ["OLD IRONSIDES", 270, 43.75, -45, 'l', 'b', 12, true],
                   ["GREAT AMERICA", 285, 43.75, -45, 'l', 'b', 13, true],
                   ["LICK MILL", 300, 43.75, -45, 'l', 'b', 14, true],
                   ["CHAMPION", 315, 43.75, -45, 'l', 'b', 15, true],
                   ["TASMAN", 328.812, 61.188, 0, 'r', 'i', 16, true],
                   ["RIVER OAKS", 342.812, 75.188, 0, 'r', 'i', 17, true],
                   ["ORCHARD", 356.812, 89.188, 0, 'r', 'i', 18, true],
                   ["BONAVENTURA", 370.812, 103.188, 0, 'r', 'i', 19, true],
                   ["COMPONENT", 384.812, 117.188, 0, 'r', 'i', 20, true],
                   ["KARINA", 398.812, 131.188, 0, 'r', 'i', 21, true],
                   ["METRO/AIRPORT", 409.393, 143.536, 0, 'r', 'm', 22, true],
                   ["GISH", 428.812, 161.188, 0, 'r', 'i', 23, true],
                   ["CIVIC", 455, 162, 0, 'm', 'db', 24, true],
                   ["CTR", 455, 162, 0, 'm', 'b', 24, true],
                   ["JAPAN-", 458.812, 191.188, 0, 'r', 'i', 25, true],
                   ["TOWN/AYER", 465.412, 191.188, 0, 'r', 'di', 25, true],
                   ["ST. JAMES", 472.045, 207.955, 0, 'r', 'i', 26, true],
                   ["SANTA CLARA", 484.973, 220.884, 0, 'r', 'm', 27, true],
                   ["PASEO", 515.652, 230.348, 0, 'l', 'b', 28, true],
                   ["DE SAN", 522.252, 230.348, 0, 'l', 'ib', 28, true],
                   ["ANTONIO", 528.852, 230.348, 0, 'l', 'dib', 28, true],
                   ["CONVENTION CTR", 512.652, 262.652, 0, 'l', 'i', 29, true, true],
                   ["CHILDREN'S", 507.348, 272.652, 0, 'r', 'i', 30, true],
                   ["DISCOVERY MUSEUM", 513.948, 272.652, 0, 'r', 'di', 30, true],
                   ["VIRGINIA", 522.348, 287.652, 0, 'r', 'i', 31, true],
                   ["TAMIEN", 534.697, 300, 0, 'r', 'm', 32, true],
                   ["CURTNER", 576.25, 342.652, 0, 'r', 'i', 33, true],
                   ["CAPITOL", 576.25, 370, 0, 'r', 'm', 34, true],
                   ["OHLONE/CHYNOWETH", 571.25, 400, 0, 'r', 'm', 35, true],
                   ["BLOSSOM", 612.75, 413.75, 0, 'r', 'i', 36, true],
                   ["HILL", 612.75, 413.75, 0, 'r', 'di', 36, true],
                   ["SNELL", 637.348, 432.652, 0, 'r', 'i', 37, true],
                   ["COTTLE", 672.5, 446.25, 0, 'l', 'b', 38, true],
                   ["SANTA", 700, 446.25, 0, 'l', 'db', 39, true],
                   ["TERESA", 700, 446.25, 0, 'l', 'b', 39, true],
                   ["BAYPOINTE", 352.5, 31.25, -45, 'l', 'b', 40, true],
                   ["CISCO WAY", 383.75, 31.25, -45, 'l', 'b', 41, true],
                   ["ALDER", 415, 31.25, -45, 'l', 'b', 42, true],
                   ["GREAT MALL", 446.25, 31.25, -45, 'l', 'b', 43, true],
                   ["MILPITAS", 477.5, 31.25, -45, 'l', 'b', 44, true],
                   ["CROPLEY", 506.188, 43.812, 0, 'l', 'b', 45, true],
                   ["HOSTETTER", 521.188, 58.812, 0, 'l', 'b', 46, true],
                   ["BERRYESSA", 536.188, 73.812, 0, 'l', 'b', 47, true],
                   ["PENITENCIA CREEK", 551.188, 88.812, 0, 'l', 'b', 48, true],
                   ["McKEE", 573.839, 111.464, 0, 'l', 'm', 49, true],
                   ["ALUM ROCK", 603.143, 131.928, 0, 'l', 'm', 50, true],
                   ["SAN", 484.848, 250.152, 0, 'r', 'i', 51, true],
                   ["FERNANDO", 484.848, 250.152, 0, 'r', 'di', 51, true],
                   ["SAN JOSE DIRIDON", 451, 245, 0, 'r', 'm', 52, true],
                   ["RACE", 437.348, 317.348, 0, 'r', 'b', 53, true],
                   ["FRUITDALE", 417.348, 337.348, 0, 'r', 'b', 54, true],
                   ["BASCOM", 367.348, 387.348, 0, 'r', 'b', 55, true],
                   ["HAMILTON", 357.348, 397.348, 0, 'r', 'b', 56, true],
                   ["DOWNTOWN", 327.652, 437.652, 0, 'l', 'i', 57, true],
                   ["CAMPBELL", 327.652, 437.652, 0, 'l', 'di', 57, true],
                   ["WINCHESTER", 312.348, 447.651, 0, 'r', 'i', 58, true],
                   ["OAKRIDGE", 557.348, 417.348, 0, 'r', 'b', 59, true],
                   ["ALMADEN", 537.348, 437.348, 0, 'r', 'b', 60, true],
                   ["ALMADEN", 479.848, 229.544, 0, 'r', 'b', 61, true],
                   ["5th", 502.045, 207.348, 0, 'r', 'b', 62, true],
                   ["11th/", 484.652, 150.652, 0, 'l', 'i', 63, true],
                   ["TAYLOR", 491.252, 150.652, 0, 'l', 'di', 63, true],
                   ["BERRYESSA", 492.928, 127.232, 0, 'r', 'm', 64, true],
                   ["PALO ALTO", 37.5, 30, 0, 'r', 'm', 65, true],
                   ["EMBARCADERO", 54.013, 47.547, 0, 'r', 'i', 66, true],
                   ["CALIFORNIA", 69.794, 63.328, 0, 'r', 'i', 67, true],
                   ["ARASTRADERO", 85.574, 79.108, 0, 'r', 'i', 68, true],
                   ["SHOWERS", 101.355, 94.889, 0, 'r', 'i', 69, true],
                   ["CASTRO", 137.5, 113.75, 0, 'r', 'i', 70, true],
                   ["BERNARDO", 161.348, 124.882, 0, 'r', 'i', 71, true],
                   ["SUNNYVALE", 183.75, 134.696, 0, 'l', 'b', 72, true],
                   ["FAIR OAKS", 197.652, 147.044, 0, 'l', 'b', 73, true],
                   ["WOLFE", 217.5, 172.5, 0, 'r', 'i', 74, true],
                   ["LAWRENCE", 242.5, 172.5, 0, 'm', 'i', 75, true],
                   ["KIELY", 272.5, 162.5, 0, 'l', 'b', 76, true],
                   ["SCOTT", 325, 162.5, 0, 'm', 'b', 77, true],
                   ["SANTA CLARA TC", 381, 175, 0, 'r', 'm', 78, true],
                   ["TAYLOR/NAGLEE", 409.697, 205, 0, 'r', 'm', 79, true],
                   ["JULIAN/RACE", 435.581, 229.115, 0, 'r', 'i', 80, true],
                   ["17th", 525.185, 184.208, 0, 'r', 'b', 81, true],
                   ["24th", 535.673, 173.720, 0, 'r', 'b', 82, true],
                   ["KING", 544.393, 163.234, 0, 'r', 'm', 83, true],
                   ["JACKSON", 574, 150, 0, 'l', 'm', 84, true],
                   ["STORY", 645.884, 188.813, 0, 'r', 'm', 85, true],
                   ["OCALA", 674.723, 205.277, 0, 'l', 'b', 86, true],
                   ["EASTRIDGE", 699.723, 230.277, 0, 'l', 'b', 87, true],
                   ["INNOVATION WAY", 183.75, 64.242, 0, 'l', 'm', 88, true],
                   ["ROSS", 183.75, 75.984, 0, 'l', 'm', 89, true],
                   ["SAN ALESO", 183.75, 87.726, 0, 'l', 'm', 90, true],
                   ["MAUDE", 183.75, 99.469, 0, 'l', 'm', 91, true],
                   ["CALIFORNIA", 183.75, 111.211, 0, 'l', 'm', 92, true],
                   ["SUNNYVALE TC", 183.75, 122.953, 0, 'l', 'm', 93, true],
                   ["FREMONT", 176.25, 170, 0, 'r', 'm', 94, true],
                   ["HOMESTEAD", 167.5, 246.25, 0, 'r', 'b', 95, true],
                   ["STELLING", 156.25, 262.5, 0, 'r', 'm', 96, true],
                   ["DE ANZA", 180, 262.5, 0, 'm', 'b', 97, true],
                   ["WOLFE", 212.5, 272.5, 0, 'r', 'i', 98, true],
                   ["LAWRENCE", 240, 272.5, 0, 'm', 'i', 99, true],
                   ["KIELY", 272.5, 262.5, 0, 'l', 'b', 100, true],
                   ["SAN TOMAS", 295, 272.5, 0, 'm', 'i', 101, true],
                   ["ROW", 322.5, 262.5, 0, 'l', 'b', 102, true],
                   ["SANTANA", 322.5, 262.5, 0, 'l', 'db', 102, true],
                   ["BASCOM", 372.5, 262.5, 0, 'l', 'b', 103, true],
                   ["RACE", 440, 262.5, 0, 'r', 'b', 104, true],
                   ["BIRD", 462.5, 272.5, 0, 'r', 'i', 105, true],
                   ["McKEE", 528.282, 146.945, 0, 'r', 'm', 106, true],
                   ["MONTEREY/BRANHAM", 654.267, 377.070, 0, 'l', 'i', 107, true],
                   ["COLLEGE", 170, 427.5, 0, 'm', 'b', 108, true],
                   ["WEST VALLEY", 170, 427.5, 0, 'm', 'db', 108, true],
                   ["McKEE/WHITE", 581.678, 98.232, 0, 'l', 'b', 109, true],
                   ["BASCOM/UNION", 372.5, 440, 0, 'l', 'm', 110, true],
                   ["VALLEY", 372.5, 342.5, 0, 'l', 'i', 111, true],
                   ["MED", 372.5, 342.5, 0, 'l', 'di', 111, true],
                   ["DE ANZA", 155, 272.5, 0, 'm', 'i', 112, true],
                   ["COLLEGE", 155, 272.5, 0, 'm', 'di', 112, true]
                 ];

//draw the labels on the map
stopText.selectAll("text")
   .data(stopLabels)
 .enter()
   .append("text")
   .attr("transform", function(d) { return "rotate(" + d[3] + " " + d[1] + " " + d[2] + ")"; })
   .attr("class", "stopLabel")
   .attr("id", function(d) { return "stop-" + d[6]; })
   .text(function(d) { return d[0]; })
   .attr("x", function(d) { return d[1]; })
   .attr("y", function(d) { return d[2]; })
   .attr("text-anchor", function(d) { return textAnchor(d[4]); })
   .attr("dy", function(d) { return dy(d[5]); })
   .attr("font-size", "6px")
   .attr("font-weight", "bold");

//draw text shadow if necessary
stopLabels.forEach(function(d) {
  if (d[8]) {
    stopShade.append("text")
      .attr("transform", "rotate(" + d[3] + " " + d[1] + " " + d[2] + ")")
      .attr("id", "stop-" + d[6])
      .text(d[0])
      .attr("x", d[1])
      .attr("y", d[2])
      .attr("text-anchor", textAnchor(d[4]))
      .attr("dy", dy(d[5]))
      .attr("font-size", "6px")
      .attr("font-weight", "bold")
      .attr("style", "stroke: white; stroke-width: 0.5em;");
  }
});

//redraw stop labels once route isolated via user click
function redrawStopLabels(id, tempg) {
  var labels = [];

  stopLabels.forEach(function(d) {
    if (d[6] == id) labels.push(d);
  });

  labels.forEach(function(label) {
    tempg.append("text")
      .attr("transform", "rotate(" + label[3] + " " + label[1] + " " + label[2] + ")")
      .attr("class", "stopLabel")
      .attr("id", "stop-" + label[6])
      .text(label[0])
      .attr("x", label[1])
      .attr("y", label[2])
      .attr("text-anchor", textAnchor(label[4]))
      .attr("dy", dy(label[5]))
      .attr("font-size", "6px")
      .attr("font-weight", "bold");
  });
}
