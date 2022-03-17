// Client facing scripts here\

// //////////********  Initializes the Map **********//////////////

$(document).ready(function () {
  let map = null;
  let currentMap = null;
  let currentCoords = null;
  let markers = [];

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
    if (coordTitle.length > 3) {
      placeMarker;
      addMarkerToDb(coordTitle, event.latLng);
      bindMarkerEvents(marker);
    } else {
      $('.coord-title-heading')
        .text('Please enter A title for your point!')
        .css('color', 'red');
    }
  });

  // google.maps.event.addListener(marker, 'dblclick', function () {
    map.removeOverlay(marker);
  });

  /remove markers
  google.maps.event.addListener(map, 'dblclick', function (e) {
    console.log(e);
  });
  marker.addListener('dblclick', function () {
    marker.setMap(null);
  });


  //////////DROPS PINS ON MAP/////////////////////


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



    const addMarkerToDb = () => {
      $.ajax({
        method: 'POST',
        url: '/coords_post',
      }).catch((err) => {
        console.log('err', err);
      });
    };
});
