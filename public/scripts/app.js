// Client facing scripts here\
//INTIALIZE MAP TO HOMEPAGE//
let map = null;

///or return map in init map

const initMap = function () {
  map = new google.maps.Map(document.getElementById('map'), {
    center: { lat: 45.95634662125372, lng: -66.63999655179681 },
    zoom: 6,
  });

  /////////********LISTENS FOR CLICKS AND PLACE MARKERS********/////////////
  google.maps.event.addListener(map, 'click', function (event) {
    placeMarker(map, event.latLng)
    ///calling a function to post pin
  });

  //////////******* USER DROPPED MARKERS ******/////////////

  function placeMarker(map, location) {
    const marker = new google.maps.Marker({
      position: location,
      map: map,
      animation: google.maps.Animation.DROP,
    });
    const infowindow = new google.maps.InfoWindow({
      content:
        'Latitude: ' + location.lat() + '<br>Longitude: ' + location.lng(),
    });
    infowindow.open(map, marker);
  }
};

const customMaps = function (results) {

console.log('results --->', results);

  for (i = 0; i < results.length; i++) {
    marker = new google.maps.Marker({
      position: new google.maps.LatLng(results[i].longitude, results[i].latitude),
      map: map

    })
console.log('marker --->', marker);
  }
};

///////*******DROPS MULTIPLE PINS******///////////

const loadMap = function (search) {
  $.ajax({
    method: 'GET',
    url: `/maps?search=${search}`,
  })
    .then((data) => {
console.log('this is the data ---->', data)
      //get the template vars and pass into functions

      customMaps(data.coords)
    })
    .catch((err) => {
      console.log('err', err);
    });
};

$(document).ready(function () {
  initMap();
  loadMap('Map');

});
