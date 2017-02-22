
      // var map = new L.Map('map');
// map.setView([1.310734,103.8552016], 17, false);
//
// new L.TileLayer('https://api.mapbox.com/styles/v1/popety/ciujj7mn9005u2inopkf3ynho/tiles/256/{z}/{x}/{y}?access_token=pk.eyJ1IjoicG9wZXR5IiwiYSI6ImNpdDlydDEwYzBsMWYydXAyeXhrMHhoamIifQ.9_sT8uJ8zd_6sU0ispPK3w', {
//   attribution: 'Map tiles &copy; <a href="http://mapbox.com">MapBox</a>',
//   maxZoom: 18,
//   maxNativeZoom: 20
// }).addTo(map);
//
// var osmb = new OSMBuildings(map).load();

var map = new GLMap('map', {
  position: { latitude: 1.310734, longitude: 103.8552016 },
  zoom: 18,
  minZoom: 12,
  maxZoom: 20,
  // tilt: 80
});

var osmb = new OSMBuildings({
  baseURL: './OSMBuildings',
  minZoom: 14,
  maxZoom: 22,
  attribution: '© 3D <a href="http://osmbuildings.org/copyright/">OSM Buildings</a>'
}).addTo(map);

osmb.addMapTiles(
  // 'http://{s}.tiles.mapbox.com/v3/osmbuildings.kbpalbpk/{z}/{x}/{y}.png', {
  'https://api.mapbox.com/styles/v1/popety/ciujj7mn9005u2inopkf3ynho/tiles/256/{z}/{x}/{y}?access_token=pk.eyJ1IjoicG9wZXR5IiwiYSI6ImNpdDlydDEwYzBsMWYydXAyeXhrMHhoamIifQ.9_sT8uJ8zd_6sU0ispPK3w', {
  attribution: '© Data <a href="http://openstreetmap.org/copyright/">OpenStreetMap</a> · © Map <a href="http://mapbox.com">MapBox</a>'
});

// osmb.addGeoJSONTiles('map.geojson');

// var now = new Date,
//   Y = now.getFullYear(),
//   M = now.getMonth(),
//   D = now.getDate(),
//   h = now.getHours(),
//   m = 0;

// osmb.date(new Date(2017, 4, 12, 13, 30));

// map.on('pointermove', function(e) {
//   var id = osmb.getTarget(e.x, e.y);
//   if (id) {
//     document.body.style.cursor = 'pointer';
//     osmb.highlight(id, '#f08000');
//   } else {
//     document.body.style.cursor = 'default';
//     osmb.highlight(null);
//   }
// });

//
var controlButtons = document.querySelectorAll('.control button');

for (var i = 0; i < controlButtons.length; i++) {
  controlButtons[i].addEventListener('click', function(e) {
    var button = this;
    var parentClassList = button.parentNode.classList;
    var direction = button.classList.contains('inc') ? 1 : -1;
    var increment;
    var property;

    if (parentClassList.contains('tilt')) {
      property = 'Tilt';
      increment = direction*10;
    }
    if (parentClassList.contains('rotation')) {
      property = 'Rotation';
      increment = direction*10;
    }
    if (parentClassList.contains('zoom')) {
      property = 'Zoom';
      increment = direction*1;
    }
    if (parentClassList.contains('bend')) {
      property = 'Bend';
      increment = direction*1;
    }
    if (property) {
      map['set'+ property](map['get'+ property]()+increment);
    }
  });
}
