import React from 'react'
import { useState } from 'react';

export default function Helpme() {

  const [lat, setLat] = useState(0);
  const [lon, setLon] = useState(0);

  if (navigator.geolocation) {
    navigator.geolocation.watchPosition(success, error);
  } else {
    console.log("Geolocation not supported");
  }
  
  function success(position) {
    const latitude = position.coords.latitude;
    const longitude = position.coords.longitude;
    console.log(`Latitude: ${latitude}, Longitude: ${longitude}`);
  }
  
  function error() {
    console.log("Unable to retrieve your location");
  }








  return (
    <div>
      {latitude}
      {longitude}
    </div>
  )
}
