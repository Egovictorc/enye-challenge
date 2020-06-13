import React from "react"

export interface Location {
    lat:  number, lng: number, LatLng?: any, 
}

export interface LatLng {
    lat: number;
    lng: number;
    time?: any
  }
  
  export interface PanTo {
   panTo(lat: number,
    lng: number): any 
 }

 export type GeoLocation = {
    panTo({lat, lng}: LatLng): void
  }