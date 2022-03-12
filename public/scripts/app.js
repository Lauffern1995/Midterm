// Client facing scripts here

  //INTIALIZE MAP TO HOMEPAGE//
const initMap = function() {
      map = new google.maps.Map(document.getElementById('map'), {
        center: {lat: -34.397, lng: 150.644},
        zoom: 2
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
