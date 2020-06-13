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
    lng: number,): any 
 }
