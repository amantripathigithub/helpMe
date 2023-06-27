import React, { useRef, useEffect ,useState} from 'react';
import mapboxgl from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
import { useParams } from 'react-router-dom';
import Cookies from 'js-cookie';
import axios from 'axios';
import { Toast } from 'react-hot-toast';
mapboxgl.accessToken = 'pk.eyJ1IjoiYW1hbnRyaXBhdGhpNiIsImEiOiJjbGo4Y3NoNjYxOWlvM2Z0ZWlqeDdtcG83In0.4lpEdOMCUUfO9xFQJzk86g';

const Map = () => {

  const {email} = useParams();

  const mapContainerRef = useRef(null);


  const [lng, setLng] = useState(0);
  const [lat, setLat] = useState(0);
  const [zoom, setZoom] = useState(13);
  if (navigator.geolocation) {
    navigator.geolocation.watchPosition(success, error);
  } else {
    console.log("Geolocation not supported");
  }


  function success(position) {
    const latitude = position.coords.latitude;
    const longitude = position.coords.longitude;
    setLng(longitude);
    setLat(latitude);
    console.log(`Latitude: ${latitude}, Longitude: ${longitude}`);
    const email = Cookies.get('email');
    console.log(email)


    const url='https://helpme-server1.onrender.com/savemylocation/'+email;
    console.log(url);
    const data ={email:email,lng:lng,lat:lat};
    axios.post(url,data).then((res)=>{
        console.log(res.data)
        console.log("send ur location");
    }).catch((err)=> {
       console.log("not sent ur location");
    })



  }
  
  function error() {
    console.log("Unable to retrieve your location");
  }





  useEffect(() => {
    const map = new mapboxgl.Map({
      container: mapContainerRef.current,
      style: 'mapbox://styles/mapbox/streets-v12',
      center: [lng,lat],
      zoom: zoom,
    });

    

    const marker = new mapboxgl.Marker().setLngLat([lng,lat]).addTo(map);

    return () => {
      map.remove();
    };
  });

 

  return (
    <div>
    <div ref={mapContainerRef} style={{ width: '100%', height: '400px' }} />
    <div className="sidebar">
Longitude: {lng} | Latitude: {lat} | Zoom: {zoom}
</div>

</div>
  )
};

export default Map;