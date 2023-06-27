import React from 'react'
import { useParams } from 'react-router-dom'
import axios from 'axios';
import  { toast } from 'react-hot-toast';
import  { useRef, useEffect ,useState} from 'react';
import mapboxgl from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
import Cookies from 'js-cookie';


mapboxgl.accessToken = 'pk.eyJ1IjoiYW1hbnRyaXBhdGhpNiIsImEiOiJjbGo4Y3NoNjYxOWlvM2Z0ZWlqeDdtcG83In0.4lpEdOMCUUfO9xFQJzk86g';

export default function LetsHelp() {

    

    const mapContainerRef = useRef(null);

// my location..


const [mylng, setmyLng] = useState(0);
const [mylat, setmyLat] = useState(0);
const [myzoom, setmyZoom] = useState(9);

const [lng, setLng] = useState(0);
  const [lat, setLat] = useState(0);
  const [zoom, setZoom] = useState(9);



  // map code


  
    useEffect(() => {
      const map = new mapboxgl.Map({
        container: mapContainerRef.current,
        style: 'mapbox://styles/mapbox/streets-v12',
        center: [mylng,mylat],
        zoom: zoom,
      });
  


      // new code..

      const markerPoints = [
        { lngLat: [mylng, mylat], title: 'me' },
        { lngLat: [lng, lat], title: 'user' },
        // Add more marker points as needed
      ];
  
      markerPoints.forEach((markerPoint) => {
        const { lngLat, title } = markerPoint;
        const markerElement = document.createElement('div');
        markerElement.className = 'marker';
        new mapboxgl.Marker(markerElement)
          .setLngLat(lngLat)
          .setPopup(new mapboxgl.Popup({ offset: 25 }).setHTML(`<h3>${title}</h3>`))
          .addTo(map);
      });


      // new code ends..
      
  
      const marker = new mapboxgl.Marker().setLngLat([mylng,mylat]).addTo(map);
      const marker2 = new mapboxgl.Marker().setLngLat([lng,lat]).addTo(map);


      return () => {
        map.remove();
      };
    }, [mylat,mylng,lng,lat]);
  
  
  // my location ends..
  
  
    const {id} = useParams();
    //const [count , setCount] = useState(0);
    
  
    const url='https://helpme-server1.onrender.com/lets_help/'+id;
      console.log(url);
      const data ={email:id};
     
      setInterval(() => 
      {
           
if (navigator.geolocation) {
    navigator.geolocation.watchPosition(success, error);
  } else {
    console.log("Geolocation not supported");
  }
  
  
  function success(position) {
    const latitude = position.coords.latitude;
    const longitude = position.coords.longitude;
    setmyLng(longitude);
    setmyLat(latitude);
    console.log(`my Latitude: ${latitude}, my Longitude: ${longitude}`);
    
  }
  
  function error() {
    console.log("Unable to retrieve my location");
  }
  

      

      
      
      axios.post(url,data).then((res)=>{
          console.log(res.data)
          if(res.data.ok===1){
              setLng(res.data.lng);
              setLat(res.data.lat);
              console.log("got users location location as " + lng +" and "+ lat);
             // toast.success(" long - " + lng + "\n lat - " + lat);
          }else{
              toast.error("user does not exist");
          }
          
          //setCount(count++);
          
      }).catch((err)=> {
         console.log("did not get the location");
         toast.error("did not get the location")
      })
    
     
      fetch("https://api.geoapify.com/v1/routing?waypoints="+mylat+"%2C"+mylng+"%7C"+lat+"%2C"+lng+"&mode=drive&apiKey=ae5592dc2de44b8ca3cd03203186aa0b")
  .then(response => response.json())
  .then(result =>{
    
    for(var i = 1; i<=result.features[0].properties.legs[0].steps.length;i++){
      console.log(result.features[0].properties.legs[0].steps[i-1].distance)
      console.log(result.features[0].properties.legs[0].steps[i-1].instruction.text)
    }
  })
  .catch(error => console.log('error', error));
    
    
    } , 7000);
  
         
  
      
  
  
    return (
      <div>
      <div ref={mapContainerRef} style={{ width: '100%', height: '400px' }} />
      <div className="sidebar">
 me -        
  Longitude: {mylng} | Latitude: {mylat} | Zoom: {myzoom}
  </div>
  <div className="sidebar2">
    user - 
  Longitude: {lng} | Latitude: {lat} | Zoom: {zoom}
  </div>
  
  </div>
    )
  };


