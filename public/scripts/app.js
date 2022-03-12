// Client facing scripts here

  //INTIALIZE MAP TO HOMEPAGE//
const initMap = function() {
      map = new google.maps.Map(document.getElementById('map'), {
        center: {lat: 45.95634662125372, lng: -66.63999655179681},
        zoom: 6
      });

      const marker = new google.maps.Marker({
        position: { lat: -34.397, lng: 150.644 },
        map: map,
        draggable:true,
        title:"Drag me!"
      });

      google.maps.event.addListener(map, "click", (event) => {

        const lat = event.latLng.toJSON().lat;
        const lng = event.latLng.toJSON().lng;
        // console.log(typeof lat);

        console.log(lat, lng)

      //Add Marker
      function addMarker(location) {
        const marker = new google.maps.Marker({
        position: location,
        map
        })
      }
        addMarker(event.latLng, map);

      });

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


