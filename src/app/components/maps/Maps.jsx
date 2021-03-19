import React from 'react'
import GoogleMapReact from 'google-map-react';

const Map = ({ lat, lng, zoomLevel, draggable, onChangeLocation }) => {
  const loadMap = (map, maps) => {
    let marker = new maps.Marker({
      position: { lat: lat, lng: lng },
      map,
      draggable: draggable,
      defaultAnimation: 2,
    });

    marker.addListener("dragend", () => {
      onChangeLocation(marker.getPosition().lat(), marker.getPosition().lng());
    });
  };
  
  return (
    <div style={{ height: "400px", width: "100%" }}>
      <GoogleMapReact
        bootstrapURLKeys={{ key: "AIzaSyCjTwsOnh1PVEg-rKhxEuW0xJ-sZxAucgw" }}
        defaultCenter={{ lat: 40.756795, lng: -73.954298 }}
        defaultZoom={zoomLevel}
        yesIWantToUseGoogleMapApiInternals
        onGoogleApiLoaded={({ map, maps }) => loadMap(map, maps)}
      />
    </div>
  );
}

export default Map;