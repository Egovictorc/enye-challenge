import React from "react";
import { Col } from "antd";
import { GoogleMap, useLoadScript } from "@react-google-maps/api";

import Map from "./Map";
import mapStyles from "./mapStyles";

import styles from "../scss/content.module.scss";

// const getPosition = (): Location => {
//   let center = {
//     lat: 6.14543,
//     lng: 6.78845,
//   };
//   if (navigator.geolocation) {
//     navigator.geolocation.getCurrentPosition((position) => {
//       center = {
//         lat: position.coords.latitude,
//         lng: position.coords.longitude,
//       };
//     });
//   }
//   return center;
// };

const Content = () => {
  return (
    <Col span="24" className={styles.mapContainer}>
      <Map />
    </Col>
  );
};

export default Content;
