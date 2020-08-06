import React, { useState, useRef, useCallback, useEffect } from 'react';
import { GoogleMap, useLoadScript, Marker, InfoWindow } from '@react-google-maps/api';
import Geocode from "react-geocode";


const libraries = ["places"];
const mapContainerStyle = {
  width: '100vw',
  height: '100vh'
};


export default function Map(props) {
  Geocode.setApiKey(process.env.REACT_APP_GOOGLE_MAPS_API_KEY);
  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAPS_API_KEY,
    libraries,
  });
  const [ currentPosition, setCurrentPosition ] = useState({});
  const [ selected, setSelected ] = useState({})

  const mapRef = useRef();
  const onMapLoad = useCallback((map) => {
    mapRef.current = map;
  }, []);

  const success = position => {
    const currentPosition = {
      lat: position.coords.latitude,
      lng: position.coords.longitude
    }
    setCurrentPosition(currentPosition);
  };
  
  useEffect(() => {
    if (props.city) {
      Geocode.fromAddress(props.city).then(
        response => {
          const location = response.results[0].geometry.location;
          console.log(props.city)
          console.log(location)
          setCurrentPosition(location)
        },
      )}
      else {
        
        navigator.geolocation.getCurrentPosition(success);
      }
  },[props.city])


  if(loadError) return "Error loading maps";
  if(!isLoaded) return "Loading...";
  const onSelect = item => {
    setSelected(item);
  }

  const users = props.users;
  

  return (
  <div className='map'>
 
    <GoogleMap 
      mapContainerStyle={mapContainerStyle}
      zoom={13}
      center={currentPosition}
     
    >
    
      {users && users.map(user => (
        <Marker
          key={user.name}
          position={{lat: user.lat, lng: user.lng}}
          onClick={() => onSelect(user)}
          onLoad={onMapLoad}
        />
        ))
      }
      {
        selected.lat && (
        
          <InfoWindow
          position={{ lat: selected.lat, lng: selected.lng }}
          clickable={true}
          onCloseClick={() => setSelected({})}
        >
          <div>
            <img src={selected.profile_pic} alt="pic" width="100" height="100" />
            <p>Name: {selected.name}</p>
            <p>Role: {selected.role}</p>
            <button>See Profile</button>
          </div>
        </InfoWindow>
        
        )}
    </GoogleMap>
    
  </div>
  )
}
