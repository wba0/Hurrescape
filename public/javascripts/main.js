// $(document).ready(function() {
//   $("#departure-date").datepicker();
//   $("#departure-date").valueAsDate = new Date()
// });


$(document).ready(function($) {
  //set active class to nav link for current page
  $('a[href="' + this.location.pathname + '"]').parents('li,ul').addClass('active');

  //logo alternation
  $(".logo").hover(function (){
    $("#main-logo").toggleClass("hidden");
    $("#alt-logo").toggleClass("hidden");
  });

  //tropical storm toggle
  $("#tropicalstorm-toggle").change(function() {
     console.log($(this).prop('checked'));
     $(".cat-0").toggle();
     $(".cat--1").toggle();
     $(".cat--2").toggle();
     console.log($("#storm-list .isHurricanetrue").first());
     $("#storm-list .isHurricanetrue").trigger("click");
   })

  //what?
  $(".card.ride-card").hide();
  $(".card.offer-ride-card").show();


  const windyUrl = $("#windy-iframe").attr("src");

  $.ajax({
    url: "https://api.wunderground.com/api/f7b22f01665f4002/currenthurricane/view.json",
    dataType: "jsonp",
    success: function(parsed_json) {
      console.log(parsed_json);
      const firstStorm = parsed_json.currenthurricane[0].stormInfo.stormNumber;
      $("#wu-map-img").attr("src", `https://icons.wunderground.com/data/images/${parsed_json.currenthurricane["0"].stormInfo.stormNumber}_5day.gif`);

      parsed_json.currenthurricane.forEach((hurricane, iteration) => {
        const hName = hurricane.stormInfo.stormName_Nice;
        const hNumber = hurricane.stormInfo.stormNumber;
        const hLat = hurricane.Current.lat;
        const hLng = hurricane.Current.lon;
        const hPressure = hurricane.Current.Pressure.mb;
        const hCat = hurricane.Current.SaffirSimpsonCategory;
        const hWindSpeed = hurricane.Current.WindSpeed.Mph;
        const hWindGusts = hurricane.Current.WindGust.Mph;
        let hOrNot;
        hCat >= 0 ? hOrNot = true : hOrNot = false;


        const mapUrl = `http://icons.wunderground.com/data/images/${hNumber}_5day.gif`;
        //restrict to hurricanes conditional
        // if (hCat >= 0) {
          $("#windy-container").append(`<iframe class="embed-responsive-item windy-iframe windy-${hNumber}"
          src="https://embed.windy.com/embed2.html?lat=${hLat}&lon=${hLng}&zoom=5&level=surface&overlay=wind&menu=true&message=&marker=&forecast=12&calendar=now&location=coordinates&type=map&actualGrid=&metricWind=kt&metricTemp=%C2%B0F" frameborder="0">
          </iframe>`);
        // }


        // $("#storm-list").append(
        //   `<li class="list-group-item cat-${hCat} storm-number-${hNumber}">
        //   <h5 class="storm-name text-center stroke isHurricane${hOrNot}">${hName}</h5>
        //   <ul class="storm-stats">
        //   <li>
        //     <span>Category: ${hCat}</span>
        //   </li>
        //   <li>
        //     <span>Pressure: ${hPressure} mb</span>
        //   </li>
        //   <li>
        //     <span>Wind Speed: ${hWindSpeed} mph</span>
        //   </li>
        //   <li>
        //     <span>Wind Gusts: ${hWindGusts} mph</span>
        //   </li>
        // </li>`
        // );

        $(".storm-list").append(
          `
          <div class="left-panel-card list-group-item cat-${hCat} storm-number-${hNumber}">
            <a data-toggle="collapse" href="#collapse${iteration}" aria-expanded="false" aria-controls="collapse${iteration}" class="${iteration}th-link collapsed">
              <h5 class="storm-${hNumber}-h5 left-panel-card-header storm-name text-center stroke isHurricane${hOrNot}">${hName}</h5>
            </a>
            <div id="collapse${iteration}" class="collapse" role="tabpanel" aria-labelledby="heading${iteration}" data-parent="#accordion">
              <div class="left-panel-card-body">
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
            </ul></div>
            </div>
          </div>
        `
        );

        $("#tracking-container").append(
          `<img class="embed-responsive-item  storm-img storm-img-${hNumber}" src="${mapUrl}">`
        );

        //styling on selected storm
        $(`.storm-${hNumber}-h5`).on("click", () =>{
          $(`.left-panel-card-header`).removeClass("selected-storm");
          $(`.storm-${hNumber}-h5`).addClass("selected-storm");
        });

        $(`.storm-list .storm-number-${firstStorm} .storm-name`).addClass("selected-storm");


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

        //click on first storm in list
        $(".0th-link").trigger("click");

      function reload() {
        document.getElementById('iframeid').src += '';
      }
      // btn.onclick = reload;
    }
  });
}); //document.ready
