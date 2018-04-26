document.addEventListener('DOMContentLoaded', () => {

  // USER BUTTONS

  $("#show-map-btn").click(function() {
    $("#map-wrapper").show();
    $("#pass-changer-wrapper").hide();
    $("#pdf").hide();
  });

  $("#payslip").click(function() {
    $("#map-wrapper").hide();
    $("#pass-changer-wrapper").hide();
    $("#pdf").show();
  });

  $("#change-pass").click(function() {
    $("#map-wrapper").hide();
    $("#pass-changer-wrapper").show();
    $("#pdf").hide();
  });

  $("#show-manage").click(function() {
    $("#manage-wrapper").show();
    $("#crime-wrapper").hide();
    $("#marc").hide();
  });

  $("#show-chart").click(function() {
    $("#manage-wrapper").hide();
    $("#crime-wrapper").show();
    $("#marc").hide();
  });

  $("#emergency-destroy").click(function() {
    $("#manage-wrapper").hide();
    $("#crime-wrapper").hide();
    $("#marc").show();
  });

  // CHART

  var ctx = document.getElementById("crime-canvas").getContext("2d");
  var cities = window.cities;

  let citiesName = [];
  cities.forEach(e => citiesName.push(e.cityName))

  let deaths = [];
  cities.forEach(e => deaths.push(e.deathToll));

  var myChart = new Chart(ctx, {
    type: "bar",
    data: {
      labels: citiesName,
      datasets: [
        {
          label: "Lucky fools",
          data: deaths,
          backgroundColor: [
            "rgba(255, 99, 132, 0.2)",
            "rgba(54, 162, 235, 0.2)",
            "rgba(255, 206, 86, 0.2)",
            "rgba(75, 192, 192, 0.2)",
            "rgba(153, 102, 255, 0.2)",
            "rgba(255, 159, 64, 0.2)"
          ],
          borderColor: [
            "rgba(255,99,132,1)",
            "rgba(54, 162, 235, 1)",
            "rgba(255, 206, 86, 1)",
            "rgba(75, 192, 192, 1)",
            "rgba(153, 102, 255, 1)",
            "rgba(255, 159, 64, 1)"
          ],
          borderWidth: 1
        }
      ]
    },
    options: {
      scales: {
        yAxes: [
          {
            ticks: {
              beginAtZero: true
            }
          }
        ]
      }
    }
  });

  // MARC TOMATOES

  $("#marc-pic").click( (e) => {
    $("#tomato-img")
      .css({ top: e.pageY-100, left: e.pageX-100 })
      .show();
  })
}, false);
