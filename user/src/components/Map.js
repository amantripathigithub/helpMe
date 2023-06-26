import React, { useRef, useEffect } from 'react';
import mapboxgl from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';

mapboxgl.accessToken = 'pk.eyJ1IjoiYW1hbnRyaXBhdGhpNiIsImEiOiJjbGo4Y3NoNjYxOWlvM2Z0ZWlqeDdtcG83In0.4lpEdOMCUUfO9xFQJzk86g';

const Map = () => {
  const mapContainerRef = useRef(null);

  useEffect(() => {
    const map = new mapboxgl.Map({
      container: mapContainerRef.current,
      style: 'mapbox://styles/mapbox/streets-v12',
      center: [79.1500805,26.6530441],
      zoom: 9,
    });

    const marker = new mapboxgl.Marker().setLngLat([79.1500805,26.6530441]).addTo(map);

    return () => {
      map.remove();
    };
  }, []);

  return <div ref={mapContainerRef} style={{ width: '100%', height: '400px' }} />;
};

export default Map;