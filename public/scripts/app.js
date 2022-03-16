// Client facing scripts here\

// //////////********  Initializes the Map **********//////////////

$(document).ready(function () {
  let map = null;

  const initMap = function () {
    map = new google.maps.Map(document.getElementById('map'), {
      center: { lat: 45.95634662125372, lng: -66.63999655179681 },
      zoom: 1,
    });

    /////////********LISTENS FOR CLICKS AND PLACE MARKERS********/////////////
    const addMarkerToDb = (coordTitle, map, location) => {
      console.log('map_id', `<%= map_id %>`);

      $.ajax({
        method: 'POST',
        url: '/coords_post',
        data: {
          coordTitle: coordTitle,
          map: `<%= map_id %>`,
          latitude: location.lat,
          longitude: location.lng,
        },
      }).catch((err) => {
        console.log('err', err);
      });
    };

    google.maps.event.addListener(map, 'click', function (event) {
      const coordTitle = $('.coord-title-input').val();
      // console.log(session.map_id);

      if (coordTitle.length) {
        console.log('map_id', `<%= map_id %>`);
        placeMarker(map, event.latLng, coordTitle);
        addMarkerToDb(coordTitle, map, location);
      } else {
        $('.coord-title-heading')
          .text('Please enter A title for your point!')
          .css('color', 'red');
      }
    });

    //////////******* USER DROPPED MARKERS ******/////////////

    function placeMarker(map, location, description) {
      const marker = new google.maps.Marker({
        position: location,
        map: map,
        title: description,
        animation: google.maps.Animation.DROP,
      });
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
        position: new google.maps.LatLng(
          results[i].latitude,
          results[i].longitude
        ),
        map: map,
        // center: map.setCenter(latLng),
      });
      function addInfoWindow(marker, message) {
        let description = `Description: ${message}`;
        var infoWindow = new google.maps.InfoWindow({
          content: description,
        });

        google.maps.event.addListener(marker, 'click', function () {
          infoWindow.open(map, marker);
        });
      }
      addInfoWindow(marker, results[i].title);
    }
  };

  setTimeout(() => {
    initMap();
  }, 200);

  const loadMap = function (search) {
    console.log('search', search);
    $.ajax({
      method: 'GET',
      url: `/`,
    })
      .then(() => {
        customMaps(search);
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
    console.log('URL -->', url);

    $.ajax({
      method: 'GET',
      url: url,
    })
      .then((data) => {
        initMap();
        loadMap(data.coords);
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
