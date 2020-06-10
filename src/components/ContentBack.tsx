import React from 'react'
import { Col } from "antd"
import {  GoogleMap, useLoadScript} from "@react-google-maps/api";
import mapStyles from "./mapStyles";


const containerStyle = {
    width: "100%",
    height: "100%",
  };
  
  const center = {
    lat: 43.653225,
    lng: -79.383186,
  };
  
  const options = {
    styles: mapStyles,
    disableDefaultUI: true,
    zoomControl: true
  };

  const libraries = ["places"];


const Content = () => {
    const { isLoaded, loadError } = useLoadScript({
        //googleMapsApiKey: "AIzaSyBW2092JOqbJk5OaI9Zbi6HNNCKtIkID0Y",
              //googleMapsApiKey: "AIzaSyA_IHyvbkCWOFny7hxZRxF5sI7iuTGk5_E",
              googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAPS_API_KEY,
        //googleMapsApiKey: "AIzaSyBfpu1cYo_ikdYZ0dfn3skRpH8ygg3kL-Q",
   libraries
      });

      
  if (loadError) return <div>Error loading maps</div>;
  if (!isLoaded) return <div>Loading maps</div>;

    return (
        <Col span="18" style={{height: "500px"}}>
            <GoogleMap
        mapContainerStyle={containerStyle}
        center={center}
        zoom={10}
        options={options}
      >
        { /* Child components, such as markers, info windows, etc. */ }
      
      </GoogleMap>
        </Col>
    )
}

export default Content;
