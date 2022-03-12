// Client facing scripts here

  //INTIALIZE MAP TO HOMEPAGE//
  const initMap = function() {
    map = new google.maps.Map(document.getElementById('map'), {
      center: {lat: 45.95634662125372, lng: -66.63999655179681},
      zoom: 6
    });

    google.maps.event.addListener(map, 'click', function(event) {
      placeMarker(map, event.latLng);
    });

    function placeMarker(map, location) {
      var marker = new google.maps.Marker({
        position: location,
        map: map,
        animation: google.maps.Animation.BOUNCE,
        draggable: true,
      });
      var infowindow = new google.maps.InfoWindow({
        content: 'Latitude: ' + location.lat() +
        '<br>Longitude: ' + location.lng()
      });
      infowindow.open(map,marker);
    }
    }


const loadMap = function() {
  $.ajax({
   method: "GET",
  url: '/',
  })
  .then(res => {
  initMap();
  })
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


