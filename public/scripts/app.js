const { pinDropper } = require('../../routes/helper_functions');

// Client facing scripts here\

// on chosen map -> load associated coords

// Tap -> push coord to db

//INTIALIZE MAP TO HOMEPAGE//
const initMap = function () {
  map = new google.maps.Map(document.getElementById('map'), {
    center: { lat: 45.95634662125372, lng: -66.63999655179681 },
    zoom: 6,
  });

  const script = document.createElement('script');

  script.src =
    'https://developers.google.com/maps/documentation/javascript/examples/json/earthquake_GeoJSONP.js';
  document.getElementsByTagName('head')[0].appendChild(script);

  /////////********LISTENS FOR CLICKS AND PLACE MARKERS********/////////////

  google.maps.event.addListener(map, 'click', function (event) {
    placeMarker(map, event.latLng);
  });

  // console.log(map.data.loadGeoJson('data.json'));

  /////////******* USER DROPPED MARKERS ******/////////////

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

const testPins = [
  { lat: '47.5706', lng: '47.5706' },
  { lat: '47.5678', lng: '47.2347' },
  { lat: '47.5234', lng: '47.7686' },
  { lat: '47.7866', lng: '47.3456' },
];

[{ lat: 34.800326, lng: -111.7665047 }, 'Bell Rock'],
  // Create the markers.
  testPins.forEach(([position, title], i) => {
    const marker = new google.maps.Marker({
      position,
      map,
      title: `${i + 1}. ${title}`,
      label: `${i + 1}`,
      optimized: false,
    });

    // Loop through the results array and place a marker for each
    // set of coordinates.

    // const eqfeed_callback = function (results) {
    //   // const coordsArr = pinDropper(results);
    //   // console.log(coordsArr);

    //   for (let i = 0; i < results.features.length; i++) {
    //     const coords = results.features[i].geometry.coordinates;
    //     const latLng = new google.maps.LatLng(coords[1], coords[0]);

    //     new google.maps.Marker({
    //       position: latLng,
    //       map: map,
    //     });
    //   }
    // };

    // eqfeed_callback(testPins);

    const loadMap = function () {
      $.ajax({
        method: 'GET',
        url: '/',
      })
        .then(() => {
          initMap();
        })
        .catch((err) => {
          console.log('err', err);
        });
    };

    $(document).ready(function () {
      loadMap();
    });

    // // Client facing scripts here

    //   //INTIALIZE MAP TO HOMEPAGE//
    // const initMap = function() {
    //       map = new google.maps.Map(document.getElementById('map'), {
    //         center: {lat: 45.95634662125372, lng: -66.63999655179681},
    //         zoom: 6
    //       });

    //       google.maps.event.addListener(map, "click", (event) => {

    //         const lat = event.latLng.toJSON().lat;
    //         const lng = event.latLng.toJSON().lng;
    //         console.log(lat, lng)

    //       //Add Marker
    //       function addMarker(location) {
    //         const marker = new google.maps.Marker({
    //         position: location,
    //         map,
    //         draggable: true

    //         })
    //       }
    //         addMarker(event.latLng, map);

    //       });

    // }

    // const loadMap = function() {
    //     $.ajax({
    //      method: "GET",
    //     url: '/',
    //     })
    //     .then(res => {
    //     initMap();
    //     })
    //     .catch(err => {
    //       console.log('err', err)
    //     })
    // }

    // $(document).ready(function() {

    //   loadMap();
  });
