import React, { ChangeEvent } from "react";
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

import { GeoLocation } from "./interfaces";
import styles from "../scss/content.module.scss";

const MapSearch = ({ panTo }: GeoLocation) => {
  const {
    ready,
    value,
    suggestions: { status, data },
    clearSuggestions,
    setValue,
  } = usePlacesAutocomplete();
  const [radius, setRadius] = React.useState<number>(2);

  const handleChange = ({ target }: ChangeEvent<HTMLInputElement>): void => {
    const { value } = target;
    setRadius(parseInt(value));
  };

  const handleInput = ({ target }: ChangeEvent<HTMLInputElement>): void => {
    setValue(target.value);
  };

  // const handleSelect = (val: string): void => {
  //   setValue(val, false);
  //   console.log("selected ", val);
  // };

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
        <span role="img" aria-label="full moon">
          {" "}
          🌝{" "}
        </span>
        Hi!!! Which place do you wish to find
      </h1>

        {/* form for search radius  */}

        <div>
        <label htmlFor="radius"> Search radius: {radius} km</label>
        <div>
          <input
            type="range"
            min="2"
            id="radius"
            max="20"
            value={radius}
            onChange={handleChange}
          />
        </div>
      </div>


      <p className={styles.subtitle}>Please enter the city or address below</p>

      <Combobox
        onSelect={async (address) => {
          setValue(address, false);
          clearSuggestions();
          try {
            const results = await getGeocode({ address });
            const { lat, lng } = await getLatLng(results[0]);
            panTo({ lat, lng });
            //   console.log(lat, lng);
          } catch (error) {
            console.log("error!");
          }
        }}
        aria-labelledby="demo"
      >
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
};

export default MapSearch;
