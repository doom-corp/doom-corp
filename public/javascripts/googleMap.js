    var locations = [
      
      ["DoomCorp", 40.445354, -3.73492]
      
    ];
    
    var locations = cities;
function initMap () {
  console.log('cities')
  console.log(cities)
   
    
    var map = new google.maps.Map(document.getElementById('map'), {
      zoom: 14,
      center: new google.maps.LatLng(40.445354, -3.73492),
    });
    
    var infowindow = new google.maps.InfoWindow();
    
    var marker, i;
    var markers = [];

    const input = /** @type {!HTMLInputElement} */(document.getElementById('pac-input'));
    
    const autocomplete = new google.maps.places.Autocomplete(input);
    autocomplete.bindTo('bounds', map);

    

    autocomplete.addListener('place_changed', function() {
            infowindow.close();
            marker.setVisible(false);
            const place = autocomplete.getPlace();
          /*  if (!place.geometry) {
              // User entered the name of a Place that was not suggested and
              // pressed the Enter key, or the Place Details request failed.
              window.alert("No details available for input: '" + place.name + "'");
              return;
            }*/
          })


    
         var geocoder = new google.maps.Geocoder();
       
        
        document.getElementById("pac-input").addEventListener("change", function(){
          var direction = document.getElementById("pac-input").value;
          console.log("direction: " + direction);

          geocoder.geocode( { 'address': direction}, function(results, status) {
        
            if (status == google.maps.GeocoderStatus.OK) {
              var latitude = results[0].geometry.location.lat();
              var longitude = results[0].geometry.location.lng();
              console.log(latitude + "," + longitude)
            } 
            function addMarkers(lat, log){
              locations.push([direction, lat, log]);
              console.log(locations)
              
              window.location=`/save?direction=${direction}&log=${log}&lat=${lat}`

            }
            addMarkers(latitude, longitude);
            
            initMap()
          })
         
        })
        
    for (i = 0; i < locations.length; i++) {  
      console.log(i)
      marker = new google.maps.Marker({
        position: new google.maps.LatLng(locations[i].coordinates.lat, locations[1].coordinates.long),
        map: map
      });
    
      markers.push(marker);
      console.log(marker)
    }

  }

