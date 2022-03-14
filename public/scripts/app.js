// Client facing scripts here\
//INTIALIZE MAP TO HOMEPAGE//

const initMap = function () {
  map = new google.maps.Map(document.getElementById('map'), {
    center: { lat: 45.95634662125372, lng: -66.63999655179681 },
    zoom: 6,
  });

  /////////********LISTENS FOR CLICKS AND PLACE MARKERS********/////////////

  google.maps.event.addListener(map, 'click', function (event) {
    placeMarker(map, event.latLng);
  });

  //////////******* USER DROPPED MARKERS ******/////////////

  function placeMarker(map, location) {
    const marker = new google.maps.Marker({
      position: location,
      map: map,
      animation: google.maps.Animation.DROP,
      draggable: true,
    });
    const infowindow = new google.maps.InfoWindow({
      content:
        'Latitude: ' + location.lat() + '<br>Longitude: ' + location.lng(),
    });
    infowindow.open(map, marker);
  }
};

///////*******DROPS MULTIPLE PINS******///////////
const customMaps = function (results) {

  const testPins = results

  for (i = 0; i < testPins.length; i++) {
    marker = new google.maps.Marker({
      position: new google.maps.LatLng(testPins[i][0], testPins[i][1]),
      map: map
      
    })
  }
};


    const loadMap = function () {
      $.ajax({
        method: 'GET',
        url: '/',
      })
        .then(() => {
          initMap();
          customMaps();
        })
        .catch((err) => {
          console.log('err', err);
        });
    };

    $(document).ready(function () {
      loadMap();
    });

