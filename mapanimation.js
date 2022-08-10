L.mapbox.accessToken = 'pk.eyJ1IjoibWFsLXdvb2QiLCJhIjoiY2oyZ2t2em50MDAyMzJ3cnltMDFhb2NzdiJ9.X-D4Wvo5E5QxeP7K_I3O8w';

const map = L.mapbox.map('map')
  .setView([42.365554, -71.104081], 14)
  .addLayer(L.mapbox.styleLayer('mapbox://styles/mapbox/streets-v11'));


map.on('style.load', () => {
  map.setFog({}); // Set the default atmosphere style
});

L.control.scale().addTo(map);

const markers = [];

function generateRandomColor() {
  var letters = '0123456789ABCDEF';
  var color = '#';
  for (var i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
}

function paintBuses(data) {
  data.forEach( vehicle => {
    let currvehicle = markers.filter( (element) => element.id == vehicle.id);
    let marker = null;

    if (currvehicle.length == 0) {
      marker = L.marker(new L.LatLng(vehicle.attributes.latitude, vehicle.attributes.longitude), {
        icon: L.mapbox.marker.icon({'marker-symbol': 'bus', 'marker-color': generateRandomColor()}),
        title: vehicle.id
      });

      markers.push({
        id: vehicle.id, 
        marker: marker
      });
    } else {
      marker = currvehicle[0].marker;
      marker.setLatLng([vehicle.attributes.latitude, vehicle.attributes.longitude]);
    }
    marker.addTo(map);
    marker.bindPopup(vehicle.attributes.label);
  });
  var t = new Date();
  console.log(t);
  document.getElementById('datainfo').innerHTML = 'Data info: ' +  t.toLocaleTimeString();
}

function move(){
  // get bus data    
  const locations = getBusLocations;
  locations()
    .then( (data) => { paintBuses(data); } )
    .catch( (err) => { console.error('data error', err); })
  // timer
  setTimeout(move, 15000);
}


// Request bus data from MBTA
async function getBusLocations(){
  var url = 'https://api-v3.mbta.com/vehicles?api_key=ca34f7b7ac8a445287cab52fb451030a&filter[route]=1&include=trip';	
  //var url = 'https://api-v3.mbta.com/vehicles?api_key=ca34f7b7ac8a445287cab52fb451030a';	
	var response = await fetch(url);
	var json     = await response.json();
	return json.data;
}

