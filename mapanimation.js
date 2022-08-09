// This array contains the coordinates for all bus stops between MIT and Harvard
const busStops = [
  [-71.093729, 42.359244],
  [-71.094915, 42.360175],
  [-71.0958, 42.360698],
  [-71.099558, 42.362953],
  [-71.103476, 42.365248],
  [-71.106067, 42.366806],
  [-71.108717, 42.368355],
  [-71.110799, 42.369192],
  [-71.113095, 42.370218],
  [-71.115476, 42.372085],
  [-71.117585, 42.373016],
  [-71.118625, 42.374863],
];

// TODO: add your own access token
mapboxgl.accessToken = 'pk.eyJ1IjoiYWxjYWJhbmlsbGFzIiwiYSI6ImNsNmpuNmV4dzA5Y3YzYnFxcDV2dHNycGQifQ.YXX4ZEVMnfTHu2Ql16FX4Q';

// This is the map instance
let map = new mapboxgl.Map({
  container: 'map',
  style: 'mapbox://styles/mapbox/streets-v11',
  center: [2.1906674667514117,41.4434932054511],
  zoom: 14,
});


async function run(){
  // get bus data    
  const locations = await getBusLocations();
  console.log(new Date());
  console.log(locations);

  const markers = [];



  locations.forEach(element => {
    const title = element.properties.NOM_PARADA;

    var marker = new mapboxgl.Marker(
      {color: "#00FF00"}
    )
    .setLngLat([element.geometry.coordinates[0], element.geometry.coordinates[1]])
    .addTo(map);
  });

  map.addLayer(markers);

  // timer
  //setTimeout(run, 15000);
}

const URL_H8 = 'https://api.tmb.cat/v1/transit/linies/bus/208/parades?app_id=de5dd563&app_key=008dfbd63205bd063ab1dcc8493fbf2f';
const URL_H6 = 'https://api.tmb.cat/v1/transit/linies/bus/206/parades?app_id=de5dd563&app_key=008dfbd63205bd063ab1dcc8493fbf2f';


// Request bus data from TMB
async function getBusLocations(){
  const url = URL_H8;
  const response = await fetch(url);
  const json     = await response.json();
  return json.features;
}

// TODO: add a marker to the map at the first coordinates in the array busStops. The marker variable should be named "marker"

var marker = new mapboxgl.Marker()
    .setLngLat([-71.092761, 42.357575])
    .addTo(map);


// counter here represents the index of the current bus stop
let counter = 0;
function move() {
  // TODO: move the marker on the map every 1000ms. Use the function marker.setLngLat() to update the marker coordinates
  // Use counter to access bus stops in the array busStops
  // Make sure you call move() after you increment the counter.
  setTimeout(()=>{
    if (counter >= busStops.length) return;
    marker.setLngLat(busStops[counter]);
    counter++;
    move();
  },1000); 

}

run();