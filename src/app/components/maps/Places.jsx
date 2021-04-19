import React, { useState, Component, useRef, useEffect } from "react";
import GoogleMap from './GoogleMap';
import SearchBox from './SearchBox';

const Map = ({ lat, lng, zoomLevel, content, draggable, onChangeLocation, locations, showSearcBox }) => {
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
      //console.log("content", content)
      locations.forEach((element, index) => {
        //console.log(index)
        let marker = new maps.Marker({
          position: { lat: parseFloat(element.latitude.replace(",", ".")), lng: parseFloat(element.longitude.replace(",", ".")) },
          map,
          draggable: draggable,
          defaultAnimation: 2,
        });
        
        if (element.address) {
          const infowindow = new window.google.maps.InfoWindow({
            content: content.length != 0 ? content[index] : "",
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
        {/* {console.log("maps", mylocation)} */}
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