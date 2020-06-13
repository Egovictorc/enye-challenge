import React, { useState, useRef, useCallback, ChangeEvent } from "react";
import { Col } from "antd";
import {
  GoogleMap,
  useLoadScript,
  Marker,
  InfoWindow,
} from "@react-google-maps/api";

import { formatRelative } from "date-fns";
import usePlacesAutocomplete, {
  getGeocode,
  getLatLng,
} from "use-places-autocomplete";
import {
  Combobox,
  ComboboxInput,
  ComboboxPopover,
  ComboboxList,
  ComboboxOption,
} from "@reach/combobox";
import "@reach/combobox/styles.css";


import { LatLng } from "./interfaces";
import mapStyles from "./mapStyles";
import styles from "../scss/content.module.scss";

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
    // googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAPS_API_KEY,
    googleMapsApiKey: "AIzaSyDiGlZIqJ8qK4wflbqoE2KkUC9Jy1OlMrw",
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

  const mapRef = useRef();
  const onMapLoad = React.useCallback((map) => {
    mapRef.current = map;
  }, []);

  if (loadError) return <div className={styles.mapError}> 
    <span role="img" aria-label="relieved face">😌</span>&nbsp;
    Error loading maps</div>;
  if (!isLoaded) return <div className={styles.mapError}> 
  <span role="img" aria-label="smiling face">😇</span>&nbsp;
  Loading maps</div>;

  return (
    <>
      <Search />
      <GoogleMap
        mapContainerStyle={containerStyle}
        center={center}
        zoom={10}
        options={options}
        onClick={onMapClick}
        onLoad={onMapLoad}
      >
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
          lng: selected.lng
        }}
        onCloseClick={ () => {
          setSelected(null);
        } }
        >
          <div> 
            <h2> selected location</h2>
      <p> spotted {formatRelative(selected.time, new Date())} </p>
          </div>
        </InfoWindow>
      ): null}
      </GoogleMap>
    </>
  );
};


const Search: React.FC = (props) => {
const {
  ready,
  value,
  suggestions: { status, data },
  setValue
} = usePlacesAutocomplete();

const handleInput = (e: React.ChangeEvent<HTMLInputElement>): void => {
 
  setValue(e.target.value);
};

const handleSelect = (val: string): void => {
  setValue(val, false);
  console.log("selected ", val)
};

const renderSuggestions = (): JSX.Element => {
  const suggestions = data.map(({ id, description }: any) => (
    <ComboboxOption key={id} value={description} />
  ));

  return (
    <>
      {suggestions}
      {/* <li className="logo">
        <img
          src="https://developers.google.com/maps/documentation/images/powered_by_google_on_white.png"
          alt="Powered by Google"
        />
      </li> */}
    </>
  );
};

return (
  <div className={styles.mapSearch}>
    <h1 className="title"> 
    <span role="img" aria-label="full moon"> 🌝 </span>
    Hi!!! Which place do you wish to find</h1>
    <p className={styles.subtitle}>Please enter the city or landmark name
    </p>
    <Combobox onSelect={handleSelect} aria-labelledby="demo">
      <ComboboxInput
        style={{ width: 300, maxWidth: "90%" }}
        value={value}
        onChange={handleInput}
        disabled={!ready}
        placeholder="Eg: lagos"
      />
      <ComboboxPopover>
        <ComboboxList>{status === "OK" && renderSuggestions()}</ComboboxList>
      </ComboboxPopover>
    </Combobox>
  </div>
);
}




export default Content;
