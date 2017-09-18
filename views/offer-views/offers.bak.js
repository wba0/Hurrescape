<h2>My Offers</h2>

<h2>New Offer</h2>






<form class="styled-form" action="/offers" method="post">
  <div class="row no-max-width">

    <div class="form-group col-md-6 map-group pull-left">
      <div id="originMap"></div>
      <label for="origin">Origin City</label>
      <div id="pac-container">
        <input class="form-control" id="pac-input" type="text" placeholder="Enter a location" name="originCity">
      </div>
      <%# <input class="form-control" id="origin" type="text" name="originCity" placeholder="Miami">%>
        <input id="origin-lat" type="hidden" name="originCityLatLng[]" value="">
        <input id="origin-lng" type="hidden" name="originCityLatLng[]" value="">
    </div>
    <div class="form-group col-md-6 map-group pull-right">
      <div id="destinationMap"></div>
      <label for="destination">Destination City</label>
      <div id="pac-container-destination">
        <input class="form-control" id="pac-input-destination" type="text" placeholder="Enter a location" name="destinationCity">
      </div>
      <%# <input class="form-control" id="destination" type="text" name="destinationCity" placeholder="Orlando">%>
        <input id="destination-lat" type="hidden" name="destinationCityLatLng[]" value="">
        <input id="destination-lng" type="hidden" name="destinationCityLatLng[]" value="">
    </div>
  </div>
  <div class="form-group">
    <label for="car-type">Car Type</label>
    <select class="form-control" id="car-type" name="carType">
                <option value="mini">Mini</option>
                <option value="sedan" selected>Sedan</option>
                <option value="suv">SUV or Van</option>
                <option value="truck">Truck</option>
              </select>
  </div>
  <div class="form-group">
    <label for="spaces-available">Spaces Available</label>
    <select class="form-control" id="spaces-available" name="spacesAvailable">
                <option value="1" selected>1</option>
                <option value="2">2</option>
                <option value="3">3</option>
                <option value="4">4</option>
                <option value="5">5</option>
                <option value="6" >6</option>
              </select>
  </div>
  <div class="form-group">
    <label for="pets-accepted">Pets Accepted?</label>
    <select class="form-control" id="pets-accepted" name="petsAccepted">
      <option value="yes">Yes</option>
      <option value="no" selected>No</option>
    </select>
  </div>
  <div class="form-group" data-provide="datepicker">
    <label for="departure-date">Departure Date</label>
    <input class="form-control" id="departure-date" type="date" name="departureDate" placeholder="" value="2017-11-01">
  </div>
  <div class="form-group">
    <label for="departure-time">Departure Time</label>
    <select class="form-control" id="departure-time" name="departureTime">
      <option value="morning">Morning</option>
      <option value="afternoon" selected>Afternoon</option>
      <option value="evening">Evening</option>
      <option value="night">Night Flight</option>
    </select>
  </div>
  <div class="form-group">
    <label for="barter-item">What would you like in exchange for this ride?</label>
    <select class="form-control" id="barter-item" name="barterItem">
      <option value="food">Food</option>
      <option value="water" selected>Water</option>
      <option value="gas">Gas</option>
      <option value="humor">Good Humor</option>
    </select>
  </div>

  <button class="btn btn-large btn-success">Add</button>
</form>


<ul>
  <%listOfOffers.forEach((offer) => {%>
    <li>
      <h3><%=offer.origin%></h3> <span>to</span>
      <h3><%=offer.destination%></h3>

      <a href="/offers/<%=offer._id%>/edit">Edit</a>
      <a href="/offers/<%=offer._id%>/delete">Delete</a>
    </li>

    <%})%>
</ul>

<script src="https://maps.googleapis.com/maps/api/js?key=AIzaSyDvKcCoWtaoF6g7rspGQKL1zWMtwliK6hw&libraries=places&callback=initMap" async defer></script>
<script>
  // This example requires the Places library. Include the libraries=places
  // parameter when you first load the API. For example:
  // <script src="https://maps.googleapis.com/maps/api/js?key=YOUR_API_KEY&libraries=places">
  function initMap() {
    var originMap = new google.maps.Map(document.getElementById('originMap'), {
      center: {
        lat: -33.8688,
        lng: 151.2195
      },
      zoom: 14,
      zoomControl: false,
      mapTypeControl: false,
      streetViewControl: false,
      rotateControl: false,
      fullscreenControl: false
    });

    var destinationMap = new google.maps.Map(document.getElementById('destinationMap'), {
      center: {
        lat: -33.8688,
        lng: 151.2195
      },
      zoom: 14,
      zoomControl: false,
      mapTypeControl: false,
      streetViewControl: false,
      rotateControl: false,
      fullscreenControl: false
    });

    var card = document.getElementById('pac-card');
    var input = document.getElementById('pac-input');
    var cardD = document.getElementById('pac-card-destination');
    var inputD = document.getElementById('pac-input-destination');

    originMap.controls[google.maps.ControlPosition.TOP_RIGHT].push(card);
    destinationMap.controls[google.maps.ControlPosition.TOP_RIGHT].push(cardD);

    var autocomplete = new google.maps.places.Autocomplete(input);
    var autocompleteD = new google.maps.places.Autocomplete(inputD);

    // Bind the map's bounds (viewport) property to the autocomplete object,
    // so that the autocomplete requests use the current map bounds for the
    // bounds option in the request.
    autocomplete.bindTo('bounds', originMap);
    autocompleteD.bindTo('bounds', destinationMap);

    var infowindow = new google.maps.InfoWindow();
    var infowindowContent = document.getElementById('infowindow-content');
    infowindow.setContent(infowindowContent);
    var marker = new google.maps.Marker({
      map: originMap,
      anchorPoint: new google.maps.Point(0, -29)
    });

    var infowindowD = new google.maps.InfoWindow();
    var infowindowContentD = document.getElementById('infowindow-content-destination');
    infowindowD.setContent(infowindowContentD);
    var markerD = new google.maps.Marker({
      map: destinationMap,
      anchorPointD: new google.maps.Point(0, -29)
    });


    autocomplete.addListener('place_changed', function() {
      infowindow.close();
      marker.setVisible(false);
      var place = autocomplete.getPlace();

      document.getElementById("origin-lat").value = place.geometry.location.lat();
      document.getElementById("origin-lng").value = place.geometry.location.lng();
      // $("#origin-lat-lng").value(oLatLngArr);

      if (!place.geometry) {

        window.alert("No details available for input: '" + place.name + "'");
        return;
      }


      // If the place has a geometry, then present it on a map.
      if (place.geometry.viewport) {
        originMap.fitBounds(place.geometry.viewport);
      } else {
        originMap.setCenter(place.geometry.location);
        originMap.setZoom(17); // Why 17? Because it looks good.
      }
      marker.setPosition(place.geometry.location);
      marker.setVisible(true);

      var address = '';
      if (place.address_components) {
        address = [
          (place.address_components[0] && place.address_components[0].short_name || ''),
          (place.address_components[1] && place.address_components[1].short_name || ''),
          (place.address_components[2] && place.address_components[2].short_name || '')
        ].join(' ');
      }

    });

    autocompleteD.addListener('place_changed', function() {
      infowindowD.close();
      markerD.setVisible(false);
      var placeD = autocomplete.getPlace();
      document.getElementById("destination-lat").value = placeD.geometry.location.lat();
      document.getElementById("destination-lng").value = placeD.geometry.location.lng();
      if (!placeD.geometry) {

        window.alert("No details available for input: '" + placeD.name + "'");
        return;
      }

      // If the place has a geometry, then present it on a map.
      if (placeD.geometry.viewport) {
        destinationMap.fitBounds(placeD.geometry.viewport);
      } else {
        destinationMap.setCenter(placeD.geometry.location);
        destinationMap.setZoom(17); // Why 17? Because it looks good.
      }
      markerD.setPosition(placeD.geometry.location);
      markerD.setVisible(true);

      var addressD = '';
      if (placeD.address_components) {
        addressD = [
          (placeD.address_components[0] && placeD.address_components[0].short_name || ''),
          (placeD.address_components[1] && placeD.address_components[1].short_name || ''),
          (placeD.address_components[2] && placeD.address_components[2].short_name || '')
        ].join(' ');
      }

    });

  }
</script>
