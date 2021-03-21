import React, { useState, Component, useRef, useEffect } from "react";
import GoogleMap from './GoogleMap';
import SearchBox from './SearchBox';

const SetPlace = ({ lat, lng, zoomLevel, onChangeLocation, location }) => {
  let marker = null;
  const [mapLoaded, setMapLoaded] = useState(null);
  const [mapApi, setMapApi] = useState(null);
  const [mapInstance, setMapInstance] = useState(false);
  const [places, setPlaces] = useState([]);

  const addPlace = (place) => {
    setPlaces(place);
  };

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

    if (location) {
      marker = new maps.Marker({
        position: { lat: location.lat, lng: location.lng },
        map,
        draggable: draggable,
        defaultAnimation: 2,
      });
      
      map.addListener('click', function(e) {
        clearOverlays();
        let marker = new window.google.maps.Marker({
          position: e.latLng,
          map: map
        });
        map.panTo(e.latLng);
        markers.push(marker);
        onChangeLocation((e.latLng));
      });
    }
  };
  
  return (
      <>
        {mapLoaded && <SearchBox map={mapInstance} mapApi={mapApi} addplace={addPlace} />}
        <GoogleMap
          defaultZoom={zoomLevel ? zoomLevel : 10}
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