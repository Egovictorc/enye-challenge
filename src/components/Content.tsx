import React, { useState, useEffect } from 'react'
import { Col } from "antd"

import Map from "./Map"
import styles from "../scss/content.module.scss"


interface Location {
    lat: number,
    lng: number
}
const Content = () => {

    const [center, setCenter ] = useState<Location>({
        lat: 6.14543, lng: 6.78845 
    })

    useEffect(  ()=> {
        setCenter(getPosition())
    }, [center])


    const getPosition = (): Location => {
        let center = {
            lat: 6.14543, lng: 6.78845
        };
        if (navigator.geolocation) {
          navigator.geolocation.getCurrentPosition((position) => {
            center = {
              lat: position.coords.latitude,
              lng: position.coords.longitude,
            };
          });
        }
        return center;
      };


    return (
        <Col span="18" className={styles.mapContainer}>
          <Map
              center={center}  
          googleMapURL={`https://maps.googleapis.com/maps/api/js?key=AIzaSyA_IHyvbkCWOFny7hxZRxF5sI7iuTGk5_E&v=3.exp&libraries=geometry,drawing,places`}
          loadingElement={<div style={{ height: `100%` }} />}
          containerElement={<div style={{ height: `100%`, width: "100%" }} />}
          mapElement={<div style={{ height: `100%` }} />}
  
          />
        
        </Col>
    )
}

export default React.memo(Content);
