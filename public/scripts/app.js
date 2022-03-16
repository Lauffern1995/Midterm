// Client facing scripts here\

// //////////********  Initializes the Map **********//////////////

$(document).ready(function () {
  let map = null;
  let currentMap = null;
  let currentCoords = null;

  const initMap = function () {
    map = new google.maps.Map(document.getElementById('map'), {
      center: { lat: 45.95634662125372, lng: -66.63999655179681 },
      zoom: 1,
    });

    let markers = { currentCoords };

    const bindMarkerEvents = function (marker) {
      console.log('MARKER -->', marker);
      google.maps.event.addListener(marker, 'rightclick', function (point) {
        console.log('POINT ', point);
        var markerId = getMarkerUniqueId(
          point.latLng.lat(),
          point.latLng.lng()
        ); // get marker id by using clicked point's coordinate
        var marker = markers[markerId]; // find marker
        removeMarker(marker, markerId); // remove it
      });
    };

    const removeMarker = function (marker, markerId) {
      marker.setMap(null); // set markers setMap to null to remove it from map
      delete markers[markerId]; // delete marker instance from markers object
    };

    /////////********LISTENS FOR CLICKS AND PLACE MARKERS********/////////////
    const addMarkerToDb = (coordTitle, location) => {
      $.ajax({
        method: 'POST',
        url: '/coords_post',
        data: {
          title: coordTitle,
          map_id: currentMap,
          latitude: location.lat(),
          longitude: location.lng(),
        },
      }).catch((err) => {
        console.log('err', err);
      });
    };

    google.maps.event.addListener(map, 'click', function (event) {
      const coordTitle = $('.coord-title-input').val();
      console.log(event);
      console.log(currentCoords.length);
      if (coordTitle.length) {
        placeMarker(map, event.latLng, coordTitle);
        addMarkerToDb(coordTitle, event.latLng);
        bindMarkerEvents(marker);
      } else {
        $('.coord-title-heading')
          .text('Please enter A title for your point!')
          .css('color', 'red');
      }
    });

    // // google.maps.event.addListener(marker, 'dblclick', function () {
    //   map.removeOverlay(marker);
    // });

    ///remove markers
    // google.maps.event.addListener(map, 'dblclick', function (e) {
    //   console.log(e);
    // });
    // marker.addListener('dblclick', function () {
    //   marker.setMap(null);
    // });

    //////////******* USER DROPPED MARKERS ******/////////////

    function placeMarker(map, location, description) {
      const marker = new google.maps.Marker({
        position: location,
        map: map,
        title: description,
        animation: google.maps.Animation.DROP,
      });
      // google.maps.event.addListener(marker, 'rightclick', function () {
      //   delMarker(marker);
      // });
      // const delMarker = function (markerPar) {
      //   markerPar.setMap(null);
      // };

      const infowindow = new google.maps.InfoWindow({
        content:
          // 'Latitude: ' +
          // location.lat() +
          // '<br>Longitude: ' +
          // location.lng() +
          // '\n' +
          'Description: ' + description,
      });
      infowindow.open(map, marker);
    }
  };

  //////////DROPS PINS ON MAP/////////////////////

  const customMaps = function (results) {
    console.log('results --->', results);
    // var latLng = marker.getPosition(); // returns LatLng object
    // map.setCenter(latLng)

    for (i = 0; i < results.length; i++) {
      marker = new google.maps.Marker({
        position: new google.maps.LatLng(results[i][0], results[i][1]),
        map: map,
        // center: map.setCenter(latLng),
      });
      function addInfoWindow(marker, message) {
        let description = `Title: ${message}`;
        var infoWindow = new google.maps.InfoWindow({
          content: description,
        });

        google.maps.event.addListener(marker, 'click', function () {
          infoWindow.open(map, marker);
        });
      }
      addInfoWindow(marker, results[i][3]);
    }
  };

  setTimeout(() => {
    initMap();
  }, 200);

  const loadMap = function (currentCoords) {
    $.ajax({
      method: 'GET',
      url: `/`,
    })
      .then(() => {
        customMaps(currentCoords);
      })

      .catch((err) => {
        console.log('err', err);
      });
  };

  /////////CLICK EVENT TO RE-LOADMAP WITH COORDS BY TITLE /////

  // Loads Map clicked on in the list
  $('.map-list-item').click(function (e) {
    e.preventDefault();
    let url = $(this).text();

    $.ajax({
      method: 'GET',
      url: url,
    })
      .then((data) => {
        currentMap = data.coords[0].map_id;
        currentCoords = data.coords.map((coord) => {
          return [coord.latitude, coord.longitude, coord.id, coord.title];
        });
        console.log('RIGGGGHT HERE---> ', currentCoords);
        initMap();
        loadMap(currentCoords);
      })

      .catch((err) => {
        console.log('err', err);
      });
  });

  const addMarkerToDb = () => {
    $.ajax({
      method: 'POST',
      url: '/coords_post',
    }).catch((err) => {
      console.log('err', err);
    });
  };
});
