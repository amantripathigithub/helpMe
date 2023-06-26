import React, { useRef, useEffect, useState } from 'react';
import mapboxgl from '!mapbox-gl'; // eslint-disable-line import/no-webpack-loader-syntax

import 'mapbox-gl/dist/mapbox-gl.css'; 
mapboxgl.accessToken = 'pk.eyJ1IjoiYW1hbnRyaXBhdGhpNiIsImEiOiJjbGo4Y3NoNjYxOWlvM2Z0ZWlqeDdtcG83In0.4lpEdOMCUUfO9xFQJzk86g';

export default function Helpme() {
  const mapContainer = useRef(null);
  const map = useRef(null);
  const [lng, setLng] = useState(0);
  const [lat, setLat] = useState(0);
  const [zoom, setZoom] = useState(13);
  if (navigator.geolocation) {
    navigator.geolocation.watchPosition(success, error);
  } else {
    console.log("Geolocation not supported");
  }

  const coordinate = [11.22222,34.44444];


  function success(position) {
    const latitude = position.coords.latitude;
    const longitude = position.coords.longitude;
    setLng(longitude);
    setLat(latitude);
    console.log(`Latitude: ${latitude}, Longitude: ${longitude}`);
  }
  
  function error() {
    console.log("Unable to retrieve your location");
  }




 
useEffect(() => {
// if (map.current) return; // initialize map only once
map.current = new mapboxgl.Map({
container: mapContainer.current,
style: 'mapbox://styles/mapbox/streets-v12',
center: [lng, lat],
zoom: zoom
});
});

useEffect(() => {
// if (!map.current) return; // wait for map to initialize
map.current.on('move', () => {
setLng(map.current.getCenter().lng.toFixed(4));
setLat(map.current.getCenter().lat.toFixed(4));
setZoom(map.current.getZoom().toFixed(2));
});
});
 
return (
<div>



<div className="sidebar">
Longitude: {lng} | Latitude: {lat} | Zoom: {zoom}
</div>
<div ref={mapContainer} className="map-container" >

</div>  
</div>
);
}