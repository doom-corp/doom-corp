function startMap() {
  const doomCorp = {
  	lat: 40.446335, 
    lng: -3.734225, 
  };
  const map = new google.maps.Map(
    document.getElementById('map'),
    {
      zoom: 15,
    }
  );
  const doomCorpMarker = new google.maps.Marker({
    position: {
      lat: doomCorp.lat,
      lng: doomCorp.lng
    },
    map: map,
    title: "DOOMCORP :D"
  });

  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(function (position) {
      const user_location = {
        lat: position.coords.latitude,
        lng: position.coords.longitude
      };

      // Center map with user location
      map.setCenter(user_location);

      // Add a marker for your user location
      const doomCorpMarker = new google.maps.Marker({
        position: {
          lat: user_location.lat,
          lng: user_location.lng
        },
        map: map,
        title: "Usted está aquí, nosotros no."
      });

    }, function () {
      console.log('Error in the geolocation service.');
    });
  } else {
    console.log('Browser does not support geolocation.');
  }
}

startMap();

