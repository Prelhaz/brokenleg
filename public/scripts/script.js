window.addEventListener('load', () => {
  console.log('Ironmaker app started successfully!');
}, false);


const $mapContainer = document.getElementById('map');

let map;

function init() {
  map = new google.maps.Map($mapContainer, {
    center: { lat: 38, lng: -9.75 },
    zoom: 8
  });
  setThingsOnMap();
}

const skateparks = [
  { lat: 38.5, lng: -7.545 },
  { lat: 37.5, lng: -7.865 },
  { lat: 38.1, lng: -7.155 },
  { lat: 38.7, lng: -9.165 },
  { lat: 34.1, lng: -9.355 },
];

function setThingsOnMap() {
  for (let skatepark of skateparks) {
    var marker = new google.maps.Marker({
      position: skatepark,
      map: map
    });

    marker.addListener('click', function() {
      console.log('Clicked store at ' + skatepark.lat + ' ' + skatepark.lng);
    });
  }
}