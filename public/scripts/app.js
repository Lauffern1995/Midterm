
// Client facing scripts here

//INTIALIZE MAP TO HOMEPAGE//
const initMap = function() {
  map = new google.maps.Map(document.getElementById('map'), {
    center: {lat: 45.95634662125372, lng: -66.63999655179681},
    zoom: 6
  });
  const latArr = [];
  const lngArr = [];



  const script = document.createElement("script");

  script.src =
  "https://developers.google.com/maps/documentation/javascript/examples/json/earthquake_GeoJSONP.js";
  document.getElementsByTagName("head")[0].appendChild(script);




  google.maps.event.addListener(map, 'click', function(event) {

    placeMarker(map, event.latLng);
    const lat = event.latLng.toJSON().lat;
    const lng = event.latLng.toJSON().lng;
    latArr.push(lat);
    lngArr.push(lng);

    // console.log(lat, lng)

  });

  // console.log(map.data.latLng)
  // console.log(map.data.loadGeoJson('data.json'));


  function placeMarker(map, location) {
      const marker = new google.maps.Marker({
        position: location,
        map: map,
        animation: google.maps.Animation.DROP,
        draggable: true,
      });
      var infowindow = new google.maps.InfoWindow({
        content: 'Latitude: ' + location.lat() +
        '<br>Longitude: ' + location.lng()
      });
      infowindow.open(map,marker);
      console.log(latArr, lngArr)

    }
  }



  // Loop through the results array and place a marker for each
  // set of coordinates.
  const eqfeed_callback = function (results) {
    for (let i = 0; i < results.features.length; i++) {
      const coords = results.features[i].geometry.coordinates;
      const latLng = new google.maps.LatLng(coords[1], coords[0]);

      new google.maps.Marker({
        position: latLng,
        map: map,
      });
    }
  };





const loadMap = function() {
  $.ajax({
   method: "GET",
  url: '/',
  })
  .then(() => { initMap() })
  .catch(err => {
    console.log('err', err)
  })
}



$(document).ready(function() {

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

// });


