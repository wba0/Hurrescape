// $(document).ready(function() {
//   $("#departure-date").datepicker();
//   $("#departure-date").valueAsDate = new Date()
// });


$(document).ready(function($) {

  $(".card.ride-card").hide();


  const windyUrl = $("#windy-iframe").attr("src");

  $.ajax({
    url: "http://api.wunderground.com/api/f7b22f01665f4002/currenthurricane/view.json",
    dataType: "jsonp",
    success: function(parsed_json) {
      console.log(parsed_json);
      const firstStorm = parsed_json.currenthurricane[0].stormInfo.stormNumber;
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

        const mapUrl = `http://icons.wunderground.com/data/images/${hNumber}_5day.gif`;
        if (hCat >= 1) {
          $("#windy-container").append(`<iframe class="windy-iframe windy-${hNumber}" width="800" height="480"
          src="https://embed.windy.com/embed2.html?lat=${hLat}&lon=${hLng}&zoom=5&level=surface&overlay=wind&menu=true&message=&marker=&forecast=12&calendar=now&location=coordinates&type=map&actualGrid=&metricWind=kt&metricTemp=%C2%B0F" frameborder="0">
          </iframe>`);
        }

        $("#storm-list").append(
          `<li class="list-group-item cat-${hCat} storm-number-${hNumber}">
          <h5 class="storm-name text-center stroke">${hName}</h5>
          <ul class="storm-stats">
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

        //styling on selected storm
        $(`.storm-number-${hNumber}`).on("click", () =>{
          $(`.storm-name`).removeClass("selected-storm");
          $(`#storm-list .storm-number-${hNumber} .storm-name`).addClass("selected-storm");
        });


        //show windy storm window when corresponding storm name is clicked
        $(`.storm-number-${hNumber}`).on("click", function() {
          $(".windy-iframe").hide();
          $(`.windy-${hNumber}`).toggle();
        });

        //show wu storm tracking when corresponding storm name is clicked
        $(`.storm-number-${hNumber}`).on("click", function() {
          $(".storm-img").css("display", "none");
          $(`.storm-img-${hNumber}`).css("display", "block");
        });

      }); //end forEach hurricane

      //show something (first storm from wu json response) on page load
      $(`#storm-list .storm-number-${firstStorm} .storm-name`).addClass("selected-storm");
      $(`.windy-${firstStorm}`).show();
      $(`.storm-img-${firstStorm}`).show();


      function reload() {
        document.getElementById('iframeid').src += '';
      }
      // btn.onclick = reload;
    }
  });
}); //document.ready
