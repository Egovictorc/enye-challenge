import React from "react";
import { Col } from "antd";
import {
  withGoogleMap,
  GoogleMap,
  Marker,
  withScriptjs,
} from "react-google-maps";



const MapComponent = withScriptjs(
  withGoogleMap((props: any) => (
    <GoogleMap defaultZoom={8} defaultCenter={props.center}>
      {props.isMarkerShown && (
        <Marker position={props.center} />
      )}
    </GoogleMap>
  ))
);

export default MapComponent;
