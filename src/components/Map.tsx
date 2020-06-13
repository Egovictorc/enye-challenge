import React, { useState, useRef, useCallback, ChangeEvent } from "react";
import { Col } from "antd";
import {
  GoogleMap,
  useLoadScript,
  Marker,
  InfoWindow,
} from "@react-google-maps/api";

import { formatRelative } from "date-fns";
import "@reach/combobox/styles.css";


import Search from "./MapSearch";
import UserLocation from "./UserLocation";
import { LatLng } from "./interfaces";
import { GOOGLE_MAP_API } from "./constants";
import mapStyles from "./mapStyles";
import styles from "../scss/content.module.scss";
//import Search from "antd/lib/transfer/search";



const containerStyle = {
  width: "100%",
  height: "100%",
};

const center = {
  lat: 6.14543,
  lng: 6.78845,
};

const options = {
  styles: mapStyles,
  disableDefaultUI: true,
  zoomControl: true,
};

const libraries = ["places"];

const Content = () => {
  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: GOOGLE_MAP_API,
    libraries,
  });
  const [markers, setMarkers] = useState<object[]>([]);
  const [selected, setSelected] = useState<LatLng | null>(null);

  const onMapClick = useCallback((event) => {
    setMarkers((cur: any) => [
      ...cur,
      {
        lat: event.latLng.lat(),
        lng: event.latLng.lng(),
        time: new Date(),
      },
    ]);
  }, []);

  const mapRef = useRef<any>();
  const onMapLoad = React.useCallback((map) => {
    mapRef.current = map;
  }, []);

  const panTo = React.useCallback(({ lat, lng }: any) => {
    mapRef.current.panTo({ lat, lng });
    mapRef.current.setZoom(10);
  }, []);

  if (loadError)
    return (
      <div className={styles.mapError}>
        <span role="img" aria-label="relieved face">
          😌
        </span>
        &nbsp; Error loading maps
      </div>
    );
  if (!isLoaded)
    return (
      <div className={styles.mapError}>
        <span role="img" aria-label="smiling face">
          😇
        </span>
        &nbsp; Loading maps...
      </div>
    );

  return (
    <>
      <Search panTo={panTo} />
      {/* <UserLocation panTo={panTo}/> */}
      <GoogleMap
        mapContainerStyle={containerStyle}
        center={center}
        zoom={10}
        options={options}
        onClick={onMapClick}
        onLoad={onMapLoad}
        
      >
        <UserLocation panTo={panTo}/>
        {/* Child components, such as markers, info windows, etc. */}
        {markers.map((marker: any, index: number) => (
          <Marker
            key={index}
            position={{ lat: marker.lat, lng: marker.lng }}
            onClick={() => {
              setSelected(marker);
            }}
          />
        ))}

        {selected ? (
          <InfoWindow
            position={{
              lat: selected.lat,
              lng: selected.lng,
            }}
            onCloseClick={() => {
              setSelected(null);
            }}
          >
            <div>
              <h2> selected location</h2>
              <p> spotted {formatRelative(selected.time, new Date())} </p>
            </div>
          </InfoWindow>
        ) : null}
      </GoogleMap>
    </>
  );
};


export default Content;
