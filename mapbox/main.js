mapboxgl.accessToken = 'pk.eyJ1IjoicG9wZXR5IiwiYSI6ImNpdDlydDEwYzBsMWYydXAyeXhrMHhoamIifQ.9_sT8uJ8zd_6sU0ispPK3w';
var map = new mapboxgl.Map({
    // style: 'mapbox://styles/mapbox/light-v9',
    style: 'mapbox://styles/popety/ciujj7mn9005u2inopkf3ynho',
    // center: [-74.0066, 40.7135],
    // zoom: 15,
    center: [103.83734351262877, 1.322451890638886],
    zoom: 15,
    pitch: 25,
    // bearing: 17.6,
    pitch: 90,
    container: 'map'
});

// var Draw = new MapboxDraw();
//
// map.addControl(Draw)

map.on('load', function () {
  map.addLayer({
      'id': 'sg',
      'type': 'fill-extrusion',
      'source': {
          // Geojson Data source used in vector tiles, documented at
          // https://gist.github.com/ryanbaumann/a7d970386ce59d11c16278b90dde094d
          'type': 'geojson',
          'data': 'map.geojson'
      },
      'paint': {
          // See the Mapbox Style Spec for details on property functions
          // https://www.mapbox.com/mapbox-gl-style-spec/#types-function
          'fill-extrusion-color': {
              // Get the fill-extrusion-color from the source 'color' property.
              'property': 'color',
              'type': 'identity'
          },
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
    'id': '3d-buildings',
    'source': 'composite',
    'source-layer': 'building',
    'filter': ['==', 'extrude', 'true'],
    'type': 'fill-extrusion',
    'minzoom': 15,
    'paint': {
        'fill-extrusion-color': '#aaa',
        'fill-extrusion-height': {
            'type': 'identity',
            'property': 'height'
        },
        'fill-extrusion-base': {
            'type': 'identity',
            'property': 'min_height'
        },
        'fill-extrusion-opacity': .6
    }
  });

  // map.setLight({color: "#6ef", intensity: 0.5, position: [1.15, 135, 45]});

  // Add a layer showing the places.
    map.addLayer({
        "id": "places",
        "type": "symbol",
        "source": {
            "type": "geojson",
            "data": {
                "type": "FeatureCollection",
                "features": [{
                    "type": "Feature",
                    "properties": {
                        "description": "<strong>Make it Mount Pleasant</strong><p><a href=\"http://www.mtpleasantdc.com/makeitmtpleasant\" target=\"_blank\" title=\"Opens in a new window\">Make it Mount Pleasant</a> is a handmade and vintage market and afternoon of live entertainment and kids activities. 12:00-6:00 p.m.</p>",
                        "icon": "marker"
                    },
                    "geometry": {
                        "type": "Point",
                        "coordinates": [103.857549, 1.310113]
                    }
                }, {
                    "type": "Feature",
                    "properties": {
                        "description": "<strong>Mad Men Season Five Finale Watch Party</strong><p>Head to Lounge 201 (201 Massachusetts Avenue NE) Sunday for a <a href=\"http://madmens5finale.eventbrite.com/\" target=\"_blank\" title=\"Opens in a new window\">Mad Men Season Five Finale Watch Party</a>, complete with 60s costume contest, Mad Men trivia, and retro food and drink. 8:00-11:00 p.m. $10 general admission, $20 admission and two hour open bar.</p>",
                        "icon": "theatre"
                    },
                    "geometry": {
                        "type": "Point",
                        "coordinates": [-77.003168, 38.894651]
                    }
                }]
            }
        },
        "layout": {
            "icon-image": "{icon}-15",
            "icon-allow-overlap": true
        }
    });
});

// When a click event occurs near a polygon, open a popup at the location of
// the feature, with description HTML from its properties.
map.on('click', function (e) {

  var features = map.queryRenderedFeatures(e.point, { layers: ['places'] });
  if (!features.length) return;

  var feature = features[0];

  // Populate the popup and set its coordinates
  // based on the feature found.
  var popup = new mapboxgl.Popup()
      .setLngLat(feature.geometry.coordinates)
      .setHTML(feature.properties.description)
      .addTo(map);
});
