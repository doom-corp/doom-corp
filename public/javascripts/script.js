document.addEventListener('DOMContentLoaded', () => {

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

  var ctx = document.getElementById("crime-canvas").getContext("2d");
  var cities = window.cities;
  console.log(cities)
  var myChart = new Chart(ctx, {
    type: "bar",
    data: {
      labels: ["Red", "Blue", "Yellow", "Green", "Purple", "Orange"],
      datasets: [
        {
          label: "# of Votes",
          data: [12, 19, 3, 5, 2, 3],
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
}, false);
