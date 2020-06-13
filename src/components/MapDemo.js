// import React, { useState, useRef, useCallback, ChangeEvent } from "react";
// import { Col } from "antd";
// import {
//   GoogleMap,
//   useLoadScript,
//   Marker,
//   InfoWindow,
// } from "@react-google-maps/api";

// import { formatRelative } from "date-fns";
// import usePlacesAutocomplete, {
//   getGeocode,
//   getLatLng,
// } from "use-places-autocomplete";
// import {
//   Combobox,
//   ComboboxInput,
//   ComboboxPopover,
//   ComboboxList,
//   ComboboxOption,
// } from "@reach/combobox";
// import "@reach/combobox/styles.css";


// import { LatLng } from "./interfaces";
// import mapStyles from "./mapStyles";
// import styles from "../scss/content.module.scss";

// const containerStyle = {
//   width: "100%",
//   height: "100%",
// };

// const center = {
//   lat: 6.14543,
//   lng: 6.78845,
// };

// const options = {
//   styles: mapStyles,
//   disableDefaultUI: true,
//   zoomControl: true,
// };



// const libraries = ["places"];

// const Content = () => {
//   const { isLoaded, loadError } = useLoadScript({
//     // googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAPS_API_KEY,
//     googleMapsApiKey: "AIzaSyDiGlZIqJ8qK4wflbqoE2KkUC9Jy1OlMrw",
//     libraries,
//   });
//   const [markers, setMarkers] = useState<object[]>([]);
//   const [selected, setSelected] = useState<LatLng | null>(null);

//   const onMapClick = useCallback((event) => {
//     setMarkers((cur: any) => [
//       ...cur,
//       {
//         lat: event.latLng.lat(),
//         lng: event.latLng.lng(),
//         time: new Date(),
//       },
//     ]);
//   }, []);

//   const mapRef = useRef();
//   const onMapLoad = React.useCallback((map) => {
//     mapRef.current = map;
//   }, []);

//   if (loadError) return <div>Error loading maps</div>;
//   if (!isLoaded) return <div>Loading maps</div>;

//   return (
//     <>
//       <Search />
//       <GoogleMap
//         mapContainerStyle={containerStyle}
//         center={center}
//         zoom={10}
//         options={options}
//         onClick={onMapClick}
//         onLoad={onMapLoad}
//       >
//         {/* Child components, such as markers, info windows, etc. */}
//         {markers.map((marker: any) => (
//           <Marker
//             key={marker.time.toISOString}
//             position={{ lat: marker.lat, lng: marker.lng }}
//             onClick={() => {
//               setSelected(marker);
//             }}
//           />
//         ))}

//         {selected ? (
//         <InfoWindow
//         position={{
//           lat: selected.lat, 
//           lng: selected.lng
//         }}
//         onCloseClick={ () => {
//           setSelected(null);
//         } }
//         >
//           <div> 
//             <h2> selected location</h2>
//       <p> spotted {formatRelative(selected.time, new Date())} </p>
//           </div>
//         </InfoWindow>
//       ): null}
//       </GoogleMap>
//     </>
//   );
// };

// function Search() {
//   const {
//     ready,
//     value,
//     suggestions: { status, data },
//     setValue,
//     clearSuggestions,
//   } = usePlacesAutocomplete({
//     requestOptions: {
//       location: { lat: () => 6.14543, lng: () => 6.78845 },
//       radius: 50 * 1000,
//     },
//   });

//   return (
//     <div className="search">
//       <Combobox onSelect={(address: string) => console.log(address)}>
//         <ComboboxInput
//           value={value}
//           onChange={(e: ChangeEvent<HTMLInputElement>) => {
//             setValue(e.target.value);
//           }}
//           disabled={!ready}
//           placeholder="enter a place"
//         />
//         <ComboboxPopover>
//           {status === "ok" &&
//             data.map(({ id, description }: any) => (
//               <ComboboxOption key={id} value={description} />
//             ))}
//         </ComboboxPopover>
//       </Combobox>
//     </div>
//   );
// }

// export default Content;
