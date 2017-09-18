// $(document).ready(function() {
//   $("#departure-date").datepicker();
//   $("#departure-date").valueAsDate = new Date()
// });


$(document).ready(function($) {
  const windyUrl = $("#windy-iframe").attr("src");
  $.ajax({
    url: "http://api.wunderground.com/api/f7b22f01665f4002/currenthurricane/view.json",
    dataType: "jsonp",
    success: function(parsed_json) {
      console.log(parsed_json);
      $("#wu-map").html(parsed_json.currenthurricane["0"].stormInfo.wuiurl);
      $("#wu-map-img").attr("src", `http://icons.wunderground.com/data/images/${parsed_json.currenthurricane["0"].stormInfo.stormNumber}_5day.gif`);

      parsed_json.currenthurricane.forEach((hurricane) => {
        const hName = hurricane.stormInfo.stormName_Nice;
        const hNumber = hurricane.stormInfo.stormNumber;
        const hLat = hurricane.Current.lat;
        const hLng = hurricane.Current.lon;
        const hPressure = hurricane.Current.Pressure.mb;
        const hCat = hurricane.Current.SaffirSimpsonCategory;
        const hWindSpeed = hurricane.Current.WindSpeed.Mph;
        const hWindGusts = hurricane.Current.WindGust.Mph;
        console.log(hLat, hLng);

        const mapUrl = `http://icons.wunderground.com/data/images/${hNumber}_5day.gif`;
        if (hCat >= 1) {
          $("#windy-container").append(`<iframe class="windy-iframe windy-${hNumber}" width="900" height="600"
          src="https://embed.windy.com/embed2.html?lat=${hLat}&lon=${hLng}&zoom=5&level=surface&overlay=wind&menu=true&message=&marker=&forecast=12&calendar=now&location=coordinates&type=map&actualGrid=&metricWind=kt&metricTemp=%C2%B0F" frameborder="0">
          </iframe>`);
        }

        $("#storm-list").append(
          `<li class="list-group-item cat-${hCat} storm-number-${hNumber}">
          <h5 class="storm-name">${hName}</h5>
          <ul class="storm-stats no-bullets">
          <li>
            <span>Category: ${hCat}</span>
          </li>
          <li>
            <span>Pressure: ${hPressure} mb</span>
          </li>
          <li>
            <span>Wind Speed: ${hWindSpeed} mph</span>
          </li>
          <li>
            <span>Wind Gusts: ${hWindGusts} mph</span>
          </li>
        </li>`
        );

        $("#tracking-container").append(
          `<img class="storm-img storm-img-${hNumber}" src="${mapUrl}">`
        );



        $(`.storm-number-${hNumber}`).on("click", function() {
          $(".windy-iframe").hide();
          $(`.windy-${hNumber}`).toggle();
        });

        $(`.storm-number-${hNumber}`).on("click", function() {
          $(".storm-img").hide();
          $(`.storm-img-${hNumber}`).toggle();
        });

      }); //end forEach hurricane


      $(".storm-name").hover(function() {
        console.log($(this).children("img"));
        $(this).siblings("img").toggle();
      });


      function reload() {
        document.getElementById('iframeid').src += '';
      }
      // btn.onclick = reload;


    }



  });



});
