
      function initMap() {
        const map = new google.maps.Map(document.getElementById('map'), {
          center: {
            lat: 40.445354, 
            lng: -3.73492
          }, 
          zoom: 15
        });
        
        const doomCorpMarker = new google.maps.Marker({
          position: {
            lat: 40.446221,
            lng: -3.733238
          },
          map: map,
          title: "DOOMCORP :D"
        });

        const input = /** @type {!HTMLInputElement} */(
            document.getElementById('pac-input'));
        
 

        const types = document.getElementById('type-selector');
        map.controls[google.maps.ControlPosition.TOP_LEFT].push(input);
        map.controls[google.maps.ControlPosition.TOP_LEFT].push(types);

        const autocomplete = new google.maps.places.Autocomplete(input);
        autocomplete.bindTo('bounds', map);

        const infowindow = new google.maps.InfoWindow();
        const marker = new google.maps.Marker({
          map: map,
          anchorPoint: new google.maps.Point(0, 0)
        });

        autocomplete.addListener('place_changed', function() {
          infowindow.close();
          marker.setVisible(false);
          const place = autocomplete.getPlace();
          if (!place.geometry) {
            // User entered the name of a Place that was not suggested and
            // pressed the Enter key, or the Place Details request failed.
            window.alert("No details available for input: '" + place.name + "'");
            return;
          }

          // If the place has a geometry, then present it on a map.
          if (place.geometry.viewport) {
            map.fitBounds(place.geometry.viewport);
          } else {
            map.setCenter(place.geometry.location);
            map.setZoom(15);  
          }
          marker.setIcon(/** @type {google.maps.Icon} */({
            url: place.icon,
            size: new google.maps.Size(71, 71),
            origin: new google.maps.Point(0, 0),
            anchor: new google.maps.Point(17, 34),
            scaledSize: new google.maps.Size(35, 35)
          }));
          marker.setPosition(place.geometry.location);
          marker.setVisible(true);

          let address = '';
          if (place.address_components) {
            address = [
              (place.address_components[0] && place.address_components[0].short_name || ''),
              (place.address_components[1] && place.address_components[1].short_name || ''),
              (place.address_components[2] && place.address_components[2].short_name || '')
            ].join(' ');
          }

          infowindow.setContent('<div><strong>' + place.name + '</strong><br>' + address);
          infowindow.open(map, marker);

        });

        // Sets a listener on a radio button to change the filter type on Places
        // Autocomplete.
        function setupClickListener(id, types) {
          const radioButton = document.getElementById(id);
          radioButton.addEventListener('click', function() {
            autocomplete.setTypes(types);
          });
        }

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

        
        var geocoder = new google.maps.Geocoder();
        var direction = input.toString();
        
        
        geocoder.geocode( { 'address': direction}, function(results, status) {
        
          if (status == google.maps.GeocoderStatus.OK) {
            var latitude = results[0].geometry.location.lat();
            var longitude = results[0].geometry.location.lng();
            console.log(latitude + "," + longitude)
          } 
        });    
 
        setupClickListener('changetype-all', []);
        setupClickListener('changetype-address', ['address']);
        setupClickListener('changetype-geocode', ['geocode']);
      }

