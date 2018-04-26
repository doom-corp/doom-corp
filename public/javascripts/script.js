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
}, false);
