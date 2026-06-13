import React, { useEffect } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';

// Fix for default marker icon in Leaflet + Vite/Webpack
import icon from 'leaflet/dist/images/marker-icon.png';
import iconShadow from 'leaflet/dist/images/marker-shadow.png';
import iconRetina from 'leaflet/dist/images/marker-icon-2x.png';

let DefaultIcon = L.icon({
  iconUrl: icon,
  shadowUrl: iconShadow,
  iconRetinaUrl: iconRetina,
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41]
});

L.Marker.prototype.options.icon = DefaultIcon;

import { locations } from '../utils/dummyLocations';

const LocationsMap = () => {
  const jakartaCenter = [-6.2088, 106.8456];

  return (
    <div className="w-full h-full min-h-[400px] rounded-2xl overflow-hidden relative z-0">
      <MapContainer 
        center={jakartaCenter} 
        zoom={11} 
        scrollWheelZoom={false}
        className="w-full h-[500px]"
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        {locations.map((loc) => (
          <Marker key={loc.id} position={loc.position}>
            <Popup>
              <div className="text-center">
                <h3 className="font-bold text-orange-600 mb-1">{loc.name}</h3>
                <p className="text-sm text-gray-600 m-0 leading-tight">{loc.address}</p>
                <p className="text-xs text-gray-400 mt-2">Open: 07:00 - 22:00</p>
              </div>
            </Popup>
          </Marker>
        ))}
      </MapContainer>
    </div>
  );
};

export default LocationsMap;
