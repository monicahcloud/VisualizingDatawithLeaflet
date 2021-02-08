var map = L.map("map", {
    center: [
        37.09, -95.71
    ],
    zoom: 5,

});

L.tileLayer("https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}", {
    attribution: "© <a href='https://www.mapbox.com/about/maps/'>Mapbox</a> © <a href='http://www.openstreetmap.org/copyright'>OpenStreetMap</a> <strong><a href='https://www.mapbox.com/map-feedback/' target='_blank'>Improve this map</a></strong>",
    tileSize: 512,
    maxZoom: 18,
    zoomOffset: -1,
    id: "mapbox/streets-v11",
    accessToken: API_KEY
}).addTo(map);


// Use this link to get the geojson data.
var link = "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_hour.geojson";



function getColor(mag){
    if (mag > 5) {
        color = '#ffffb2';
      }
      else if (mag > 4) {
        color = '#fecc5c';
      }
      else if (mag > 3) {
        color = '#fd8d3c';
      }
      else if (mag > 2) {
        color = '#f03b20';
      }
           else {
        color = '#bd0026';
      }
    return color;
}


// Grabbing our GeoJSON data..
d3.json(link, function (data) {
    // Creating a geoJSON layer with the retrieved data
    L.geoJson(data, {

        pointToLayer: function (feature, latlng) {
            return L.circleMarker(latlng, {
                color: 'black',
                fillColor: getColor(feature.properties.mag),
                radius: feature.properties.mag*10,
                fillOpacity: 1,
            });
            
        },
        
    }).addTo(map);
    // Passing in our style object

});


