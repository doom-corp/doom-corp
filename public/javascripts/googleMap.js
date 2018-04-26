    var locations = [
      
      ["DoomCorp", 40.445354, -3.73492]
      
    ];
function initMap () {
   
    
    var map = new google.maps.Map(document.getElementById('map'), {
      zoom: 18,
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
            if (!place.geometry) {
              // User entered the name of a Place that was not suggested and
              // pressed the Enter key, or the Place Details request failed.
              window.alert("No details available for input: '" + place.name + "'");
              return;
            }
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
            function addMarkers(log, lat){
              locations.push(["NOMBRE", log, lat]);
              console.log(locations)
              
              //document.getElementById("Pepe").innerHTML = log;
              window.location=`/save?log=${log}&lat=${lat}`

            }
            addMarkers(latitude, longitude);
            
            initMap()
          })
         
        })

    for (i = 0; i < locations.length; i++) {  
      marker = new google.maps.Marker({
        position: new google.maps.LatLng(locations[i][1], locations[i][2]),
        map: map
      });
    
      markers.push(marker);

    }

  }

