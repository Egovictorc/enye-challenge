import React from "react";
import { GeoLocation } from "./interfaces";

import styles from "../scss/content.module.scss";

function UserLocation({ panTo }: GeoLocation ) {

    const success = ({coords}: any) => {

        // console.log("position ", position)
        panTo({lat: coords.latitude, lng: coords.longitude});
    }

    const error = () => {

    }

  return (
    <button className={styles.locate} onClick={ () => {
        navigator.geolocation.getCurrentPosition((position)=> success(position), error)
    }}>
      <span role="img" aria-label="tent" className={styles.tentIcon}>
        ⛺{" "}
      </span>
    </button>
  );
}

export default UserLocation;
