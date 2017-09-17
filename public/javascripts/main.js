// $(document).ready(function() {
//   $("#departure-date").datepicker();
//   $("#departure-date").valueAsDate = new Date()
// });


$(document).ready(function($) {
  $.ajax({
  url : "http://api.wunderground.com/api/f7b22f01665f4002/currenthurricane/view.json",
  dataType : "jsonp",
  success : function(parsed_json) {
    console.log(parsed_json);
    $("#wu-map").html(parsed_json.currenthurricane["0"].stormInfo.wuiurl);
    $("#wu-map-img").attr("src", `http://icons.wunderground.com/data/images/${parsed_json.currenthurricane["0"].stormInfo.stormNumber}_5day.gif`);
  }
  });



});
