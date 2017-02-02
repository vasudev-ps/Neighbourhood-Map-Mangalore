var map, infoWindow;
var placeInfoWindow;
var Address = {
    lat: 12.9141,
    lng: 74.8560
};


    function initMap() {
            map = new google.maps.Map(document.getElementById('map'), {
            mapTypeControl: false,
            center: Address,
            zoom: 10
            });
            findPlaces(placeName);
    }

    // function to find the interesting places in mangalore.
    function findPlaces(name) {
        var bounds = map.getBounds();
        var Query = name + " point of interest";
        var placesService = new google.maps.places.PlacesService(map);
        placesService.textSearch({
        query: Query,
        bounds: bounds
        }, function(results, status) {
            if (status === google.maps.places.PlacesServiceStatus.OK) {
                 for (var i = 0; i < results.length; i++) {
                    markerName[i] = results[i].name;
                 }
                createMarkersForPlaces(results);
            }
            else{
               window.alert("Sorry we couldn't place Markers."+
                            " Refresh the page after sometime");
            }
        });
        map.setZoom(10);
    }

    //creating marker for each mached places
    function createMarkersForPlaces(places) {
        var defaultIcon = makeMarkerIcon('CC0000');
        var highlightedIcon = makeMarkerIcon('6600CC');
        var bounds = new google.maps.LatLngBounds();
        for (var i = 0; i < places.length; i++) {
            var place = places[i];
            // Create a marker for each place.
            var marker = new google.maps.Marker({
                map: map,
                icon: defaultIcon,
                title: place.name,
                position: place.geometry.location,
                id: place.place_id,
                animation: google.maps.Animation.DROP
            });
            // Create a single infowindow to be used with the place details information
            // so that only one is open at once.
            placeInfoWindow = new google.maps.InfoWindow();
            // If a marker is clicked, do a place details search on it in the next function.
            marker.addListener('click', function() {
                if (placeInfoWindow.marker == this) {
                    window.alert("This infowindow already is on this marker!");
                } else {
                    getPlacesDetails(this, placeInfoWindow);
                    //add wiki element links on click of marker
                    viewModel.addItem(this.title);
                }
            });
            marker.addListener('mouseover', function() {
                this.setIcon(highlightedIcon);
            });
            marker.addListener('mouseout', function() {
                this.setIcon(defaultIcon);
            });
            placeMarkers[i] = marker;
            if (place.geometry.viewport) {
                // Only geocodes have viewport.
                bounds.union(place.geometry.viewport);
            } else {
                bounds.extend(place.geometry.location);
            }
        }
        map.fitBounds(bounds);
    }
    //mapError handling for on error
    function mapError(){
            alert("Sorry we couldn't Load Map"+
            " Refresh the page after sometime");
    }
    // function to create a colored icon for marker
    function makeMarkerIcon(markerColor) {
    var markerImage = new google.maps.MarkerImage(
        'https://chart.googleapis.com/chart?chst=d_map_spin&chld=1.15|0|' + markerColor +
        '|40|_|%E2%80%A2',
        new google.maps.Size(21, 34),
        new google.maps.Point(0, 0),
        new google.maps.Point(10, 34),
        new google.maps.Size(21, 34));
    return markerImage;
    }


    //serves for request from model when clicked on link from nav
    function showInfoWindow(id){
        getPlacesDetails(placeMarkers[id],placeInfoWindow);
    }

    //function to get place details and set it
    //to infowindow.
    function getPlacesDetails(marker, infowindow) {
    marker.setAnimation(google.maps.Animation.BOUNCE);
    setTimeout(function () {
                marker.setAnimation(null);
            }, 3000);
    var service = new google.maps.places.PlacesService(map);
    var innerHTML;
    service.getDetails({
        placeId: marker.id
    }, function(place, status) {
        if (status === google.maps.places.PlacesServiceStatus.OK) {
            // Set the marker property on this infowindow so it isn't created again.
            infowindow.marker = marker;
            innerHTML = '<div class="infowindow">';
            if (place.name) {
                innerHTML += '<div class="info"><strong>' + place.name + '</strong>';
            }
            if (place.formatted_address) {
                innerHTML += '<br><p>' + place.formatted_address + '</p>';
            }
            if (place.formatted_phone_number) {
                innerHTML += '<br>' + place.formatted_phone_number;
            }
            if (place.opening_hours) {
                innerHTML += '<br><br><strong>Hours:</strong><br>' +
                    place.opening_hours.weekday_text[0] + '<br>' +
                    place.opening_hours.weekday_text[1] + '<br>' +
                    place.opening_hours.weekday_text[2] + '<br>' +
                    place.opening_hours.weekday_text[3] + '<br>' +
                    place.opening_hours.weekday_text[4] + '<br>' +
                    place.opening_hours.weekday_text[5] + '<br>' +
                    place.opening_hours.weekday_text[6];
            }
            if (place.photos) {
                innerHTML += '<br><br><img src="' + place.photos[0].getUrl({
                    maxHeight: 100,
                    maxWidth: 200
                }) + '">';
            }
            innerHTML += '</div></div>';
            infowindow.setContent(innerHTML);
            infowindow.open(map, marker);

            // Make sure the marker property is cleared if the infowindow is closed.
            infowindow.addListener('closeclick', function() {
                marker.setAnimation(null);
                infowindow.marker = null;
            });
        }
        else {
                //error message
                infowindow.marker = marker;
                innerHTML = '<div class="infowindow"><div class="info"><p>Sorry we could not find more Info:</p></div></div>';
                infowindow.setContent(innerHTML);
                infowindow.open(map, marker);
                infowindow.addListener('closeclick', function() {
                marker.setAnimation(null);
                infowindow.marker = null;
                });
            }
        });
    }