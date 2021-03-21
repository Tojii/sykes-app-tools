import React, { useState, Component, useRef, useEffect } from "react";
import GoogleMap from './GoogleMap';
import SearchBox from './SearchBox';

const Map = ({ lat, lng, zoomLevel, draggable, onChangeLocation, locations, showSearcBox }) => {
  let markers = [];
  const mylocation = [];
  
  const addPlace = (place) => {
    setPlaces(place);
    //console.log(place);
  };

  const [mapLoaded, setMapLoaded] = useState(null);
  const [mapApi, setMapApi] = useState(null);
  const [mapInstance, setMapInstance] = useState(false);
  const [places, setPlaces] = useState([]);

  const clearOverlays = () => {
    if (markers) {
      for (let i in markers) {
        markers[i].setMap(null);
      }
      markers = [];
    }
  }

  const loadMap = (map, maps) => {
    if (maps) {
      setMapInstance(map);
      setMapApi(maps);
      setMapLoaded(true);
    }

    if (locations) {
      locations.forEach(element => {
        
        let marker = new maps.Marker({
          position: { lat: parseFloat(element.latitude.replace(",", ".")), lng: parseFloat(element.longitude.replace(",", ".")) },
          map,
          draggable: draggable,
          defaultAnimation: 2,
        });
        
        if (element.address) {
          const infowindow = new window.google.maps.InfoWindow({
            content: '<div id="content">' +
            '<div id="siteNotice">' +
            "</div>" +
            `<h1 id="firstHeading" class="firstHeading">${element.benefit.name}</h1>` +
            '<div id="bodyContent">' +
            `<p><b>Address: </b> ${element.address} </p>` +
            `<p><b>Phone: </b> ${element.phone} </p>` +
            `<p><b>WhatsApp: </b> ${element.whatsApp} </p>` +
            "</div>" +
            "</div>",
          });

          marker.addListener("click", () => {
            infowindow.open(map, marker);
          });
          markers.push(marker);
        }
      });
    }
  };
  
  return (
      <>
        {console.log("maps", mylocation)}
        {mapLoaded && showSearcBox && <SearchBox map={mapInstance} mapApi={mapApi} addplace={addPlace} />}
        <GoogleMap
          defaultZoom={zoomLevel}
          defaultCenter={{ lat: lat, lng: lng }}
          bootstrapURLKeys={{
            key: process.env.REACT_APP_MAPS_KEY,
            libraries: ['places', 'geometry'],
          }}
          yesIWantToUseGoogleMapApiInternals
          onGoogleApiLoaded={({ map, maps }) => loadMap(map, maps)}
        >
        </GoogleMap>
      </>


  );
}

export default Map;
// Aditional examples: https://github.com/google-map-react/google-map-react-examples/blob/master/src/examples/Searchbox.js