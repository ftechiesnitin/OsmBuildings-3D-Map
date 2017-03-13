mapboxgl.accessToken = 'pk.eyJ1IjoicG9wZXR5IiwiYSI6ImNpdDlydDEwYzBsMWYydXAyeXhrMHhoamIifQ.9_sT8uJ8zd_6sU0ispPK3w';
var map = new mapboxgl.Map({
    // style: 'mapbox://styles/mapbox/light-v9',
    style: 'mapbox://styles/popety/cj027vv1700242snyh2hispm3',
    // center: [-74.0066, 40.7135],
    // zoom: 15,
    center: [103.81808370351791, 1.2909693808854792],
    zoom: 11,
    // bearing: 17.6,
    pitch: 0,
    container: 'map'
});

// var Draw = new MapboxDraw();
//
// map.addControl(Draw)

map.on('load', function () {

  // map.addLayer({
  //   'id': '3d-buildings',
  //   'source': 'composite',
  //   'source-layer': 'building',
  //   'filter': ['==', 'extrude', 'true'],
  //   'type': 'fill-extrusion',
  //   'minzoom': 12,
  //   'paint': {
  //       'fill-extrusion-color': '#aaa',
  //       'fill-extrusion-height': {
  //           'type': 'identity',
  //           'property': 'height'
  //       },
  //       'fill-extrusion-base': {
  //           'type': 'identity',
  //           'property': 'min_height'
  //       },
  //       'fill-extrusion-opacity': .3
  //   }
  // });

  // map.addLayer({
  //           "id": "terrain-data",
  //           "type": "fill-extrusion",
  //           "source": {
  //               type: 'vector',
  //               url: 'mapbox://mapbox.mapbox-terrain-v2'
  //           },
  //           "source-layer": "contour",
  //           'minzoom': 8,
  //           'paint': {
  //             'fill-extrusion-color': {
  //                "stops": [[0,'#fff'],[8840*0.02,'#7F7F7F'], [8840*0.1,'#232323']],
  //                "property": "ele",
  //                "base": 1
  //            },
  //               'fill-extrusion-height': {
  //                   'type': 'identity',
  //                   'property': 'ele'
  //               },
  //               'fill-extrusion-opacity':.6
  //           }
  //       });

  map.addLayer({
      'id': 'sg',
      'type': 'fill-extrusion',
      'source': {
          // Geojson Data source used in vector tiles, documented at
          // https://gist.github.com/ryanbaumann/a7d970386ce59d11c16278b90dde094d
          'type': 'geojson',
          'data': 'interlace.geojson'
      },
      'paint': {
          // See the Mapbox Style Spec for details on property functions
          // https://www.mapbox.com/mapbox-gl-style-spec/#types-function
          'fill-extrusion-color': '#FDD035',
          'fill-extrusion-height': {
              // Get fill-extrusion-height from the source 'height' property.
              'property': 'height',
              'type': 'identity'
          },
          'fill-extrusion-base': {
              // Get fill-extrusion-base from the source 'base_height' property.
              'property': 'base_height',
              'type': 'identity'
          },
          // Make extrusions slightly opaque for see through indoor walls.
          'fill-extrusion-opacity': 1
      }
  });

  map.addLayer({
      'id': 'sg-hover',
      'type': 'fill-extrusion',
      'source': {
          // Geojson Data source used in vector tiles, documented at
          // https://gist.github.com/ryanbaumann/a7d970386ce59d11c16278b90dde094d
          'type': 'geojson',
          'data': 'interlace.geojson'
      },
      'paint': {
          // See the Mapbox Style Spec for details on property functions
          // https://www.mapbox.com/mapbox-gl-style-spec/#types-function
          'fill-extrusion-color': '#ffffff',
          'fill-extrusion-height': {
              // Get fill-extrusion-height from the source 'height' property.
              'property': 'height',
              'type': 'identity'
          },
          'fill-extrusion-base': {
              // Get fill-extrusion-base from the source 'base_height' property.
              'property': 'base_height',
              'type': 'identity'
          },
          // Make extrusions slightly opaque for see through indoor walls.
          'fill-extrusion-opacity': 1
      },
      "filter": ["==", "base_height", ""]
  });

  // map.setLight({color: "#6ef", intensity: 0.5, position: [1.15, 135, 45]});

  // Add a layer showing the places.
    // map.addLayer({
    //     "id": "places",
    //     "type": "symbol",
    //     "source": {
    //         "type": "geojson",
    //         "data": {
    //             "type": "FeatureCollection",
    //             "features": [{
    //                 "type": "Feature",
    //                 "properties": {
    //                     "description": "<strong>Make it Mount Pleasant</strong><p><a href=\"http://www.mtpleasantdc.com/makeitmtpleasant\" target=\"_blank\" title=\"Opens in a new window\">Make it Mount Pleasant</a> is a handmade and vintage market and afternoon of live entertainment and kids activities. 12:00-6:00 p.m.</p>",
    //                     "icon": "marker"
    //                 },
    //                 "geometry": {
    //                   "type": "Polygon",
    //                   "coordinates": [
    //                     [
    //                       [
    //                         103.81808370351791,
    //                         1.2909693808854792
    //                       ],
    //                       [
    //                         103.81805956363677,
    //                         1.2907146356939732
    //                       ],
    //                       [
    //                         103.8185128569603,
    //                         1.290666368181133
    //                       ],
    //                       [
    //                         103.81853699684143,
    //                         1.2909237949057208
    //                       ],
    //                       [
    //                         103.81808370351791,
    //                         1.2909693808854792
    //                       ]
    //                     ]
    //                   ]
    //                 }
    //             }, {
    //                 "type": "Feature",
    //                 "properties": {
    //                     "description": "<strong>Mad Men Season Five Finale Watch Party</strong><p>Head to Lounge 201 (201 Massachusetts Avenue NE) Sunday for a <a href=\"http://madmens5finale.eventbrite.com/\" target=\"_blank\" title=\"Opens in a new window\">Mad Men Season Five Finale Watch Party</a>, complete with 60s costume contest, Mad Men trivia, and retro food and drink. 8:00-11:00 p.m. $10 general admission, $20 admission and two hour open bar.</p>",
    //                     "icon": "theatre"
    //                 },
    //                 "geometry": {
    //                     "type": "Point",
    //                     "coordinates": [-77.003168, 38.894651]
    //                 }
    //             }]
    //         }
    //     },
    //     "layout": {
    //         "icon-image": "{icon}-15",
    //         "icon-allow-overlap": true
    //     }
    // });
});

// When a click event occurs near a polygon, open a popup at the location of
// the feature, with description HTML from its properties.
// map.on('mousemove', function (e) {
//
//   var features = map.queryRenderedFeatures(e.point, { layers: ['places'] });
//   if (!features.length) return;
//
//   console.log(feature);
//
//   var feature = features[0];
//
//   // Populate the popup and set its coordinates
//   // based on the feature found.
//   var popup = new mapboxgl.Popup()
//       .setLngLat(feature.geometry.coordinates)
//       .setHTML(feature.properties.description)
//       .addTo(map);
// });


// Create a popup, but don't add it to the map yet.
var popup = new mapboxgl.Popup({
    closeButton: false,
    closeOnClick: false
});

map.on('click', function (e) {
    var features = map.queryRenderedFeatures(e.point, { layers: ['sg'] });
    // Change the cursor style as a UI indicator.
    map.getCanvas().style.cursor = (features.length) ? 'pointer' : '';

    if (!features.length) {
        popup.remove();
        return;
    }

    var feature = features[0];

    map.setFilter("sg-hover", ["==", "base_height", feature.properties.base_height]);

    popup.setLngLat(map.unproject(e.point))
        .setHTML("<b>"+feature.properties.base_height+"</b>")
        .addTo(map);
});

// Add zoom and rotation controls to the map.
map.addControl(new mapboxgl.NavigationControl());
