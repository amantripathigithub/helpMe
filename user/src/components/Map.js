import React, { useRef, useEffect } from 'react';
import mapboxgl from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';

mapboxgl.accessToken = 'pk.eyJ1IjoiYW1hbnRyaXBhdGhpNiIsImEiOiJjbGo4Y3NoNjYxOWlvM2Z0ZWlqeDdtcG83In0.4lpEdOMCUUfO9xFQJzk86g';

const Map = () => {
  const mapContainerRef = useRef(null);

  useEffect(() => {
    const map = new mapboxgl.Map({
      container: mapContainerRef.current,
      style: 'mapbox://styles/mapbox/streets-v11',
      center: [78.0080745,27.1766701],
      zoom: 9,
    });

    const marker = new mapboxgl.Marker().setLngLat([78.0080745,27.1766701]).addTo(map);

    return () => {
      map.remove();
    };
  }, []);

  return <div ref={mapContainerRef} style={{ width: '100%', height: '400px' }} />;
};

export default Map;