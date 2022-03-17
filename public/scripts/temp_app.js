
$(document).ready(function () {
  let map = null;
  let markers = {};
  let currentMap = null;
  let currentMapName = null;

  map = new google.maps.Map(document.getElementById('map'), {
    center: { lat: 45.95634662125372, lng: -66.63999655179681 },
    zoom: 1,
  });

  // converts to google lat/lang
  const getLatLng = function (lat, lng) {
    const newMap = new google.maps.LatLng(lat, lng);
    return newMap;
  };

  const initMap = () => {
    map.addListener('click', (event) => {
      createNewMarker(event.latLng);
      renderMarkers(markers);
    });
  };

  setTimeout(() => {
    initMap();
  }, 200);

  // Listens for map & Loads Map clicked on in the list
  $('.map-list-item').click(function (e) {
    e.preventDefault();
    console.log('HERE');
    let url = $(this).text();
    currentMapName = url;
    map = new google.maps.Map(document.getElementById('map'), {
      center: { lat: 45.95634662125372, lng: -66.63999655179681 },
      zoom: 1,
    });

    getMarkersFromDb(url);
    // renderMarkers();
  });

  // ~~~~~~~~~~~~~~ Creates NEW marker ~~~~~~~~~~~~~~~~~~

  function createMarker(title, location) {
    let marker = new google.maps.Marker({
      position: location,
      animation: google.maps.Animation.DROP,
      title: title,
    });
    //Attaches delete listener (MUST STAY HERE)
    marker.addListener('dblclick', function () {
      markers[title].setMap(null);
      deleteMarkerFromDb(markers[title].title);
    });
    markers[title] = marker;
  }

  // Creates Marker if NOT already in map
  function createNewMarker(location) {
    const coordTitle = $('.coord-title-input').val();
    if (!markers[coordTitle]) {
      $('.coord-title-heading')
        .text('Whats the name of the place')
        .css('color', 'black')
        .css('font-size', '1em');
      createMarker(coordTitle, location);
      addMarkerToDb(coordTitle, location);
    } else {
      $('.coord-title-heading')
        .text('Please enter A valid name for your marker!')
        .css('color', 'white')
        .css('font-size', '2em');
    }
  }

  // POST Marker to database
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

  // DELETE Marker from database

  const deleteMarkerFromDb = function (coordId) {
    $.ajax({
      data: { coordId },
      method: 'DELETE',
      url: '/coords_post',
    }).then(() => {
      getMarkersFromDb(currentMapName);
    });
  };

  // GET Markers from database and render to map
  const getMarkersFromDb = function (url) {
    $.ajax({
      method: 'GET',
      url: url,
    })
      .then((data) => {
        markers = {};
        console.log(data);
        if (data.coords.length) {
          currentMap = data.coords[0].map_id;
          console.log(currentMap);
          data.coords.forEach((coord) => {
            const markerLatLng = getLatLng(coord.latitude, coord.longitude);
            createMarker(coord.title, markerLatLng);
          });
        } else {
          console.log(data);
          currentMap = data.map_id;
          console.log('FAKE');
        }
      })
      .then(() => {
        console.log(markers);
        initMap();
        renderMarkers();
      });
  };

  //Renders all markers in markers object
  const renderMarkers = function () {
    for (const marker in markers) {
      markers[marker].setMap(map);
    }
  };
});
