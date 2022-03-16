// Client facing scripts here\

$(document).ready(function () {

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



//******************//NEEDS COORDS///************************* */

const customMaps = function (results) {

console.log('results --->', results);

  for (i = 0; i < results.length; i++) {
    marker = new google.maps.Marker({
      position: new google.maps.LatLng(results[i].longitude, results[i].latitude),
      map: map,
      title: results[i].description


    })
// console.log('marker --->', marker);
  }
};


///////*******DROPS MULTIPLE PINS******///////////
/**************************MAP NAME URL *************************/



const loadMap = function (search) {


console.log('LOADMAP==',search);


  $.ajax({
    method: 'GET',
    url: `/`,
  })
    .then((data) => {

      customMaps(search)

    })

    .catch((err) => {
      console.log('err', err);
    });
};

setTimeout(() => {
  initMap()

}, 200);



$('.map-list-item').click( function(e)  {
  e.preventDefault()
  let url = $(this).text()


  $.ajax({
        method: 'GET',
        url: url,
      })
        .then((data) => {

          loadMap(data.coords)

        })

        .catch((err) => {
          console.log('err', err);
        });
    });


});
