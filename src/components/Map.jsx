import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCities } from '../contexts/CitiesContext.jsx';
import { useGeolocation } from '../hooks/useGeolocation.js';
import {
  useMap,
  useMapEvents,
  MapContainer,
  Marker,
  Popup,
  TileLayer
} from 'react-leaflet';

import Button from './Button.jsx';
import styles from './Map.module.css';
import 'leaflet/dist/leaflet.css';
import { useUrlPosition } from '../hooks/useUrlPosition.js';

function Map() {
  const { cities } = useCities();
  const [mapPosition, setMapPosition] = useState([51.5, 0]);
  const [mapLat, mapLng] = useUrlPosition();
  const {
    isLoading: isLoadingPosition,
    getPosition,
    position: geolocationPosition
  } = useGeolocation();

  const buttonCondition =
    !geolocationPosition ||
    [geolocationPosition.lat, geolocationPosition.lng].every(
      (value, index) => value !== mapPosition[index]
    );

  useEffect(() => {
    if (mapLat && mapLng) setMapPosition([mapLat, mapLng]);
  }, [mapLat, mapLng]);

  useEffect(() => {
    if (geolocationPosition)
      setMapPosition([geolocationPosition.lat, geolocationPosition.lng]);
  }, [geolocationPosition]);

  return (
    <div className={styles.mapContainer}>
      <MapContainer
        center={mapPosition}
        zoom={6}
        scrollWheelZoom={true}
        className={styles.map}
      >
        <TileLayer url="https://{s}.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png" />
        {cities.map(({ id, emoji, cityName, position }) => {
          const { lat, lng } = position;
          return (
            <Marker position={[lat, lng]} key={id}>
              <Popup>
                <span>{emoji}</span>
                <span>{cityName}</span>
              </Popup>
            </Marker>
          );
        })}
        <ChangeCenter center={mapPosition} />
        <DetectClick />
      </MapContainer>
      {buttonCondition && (
        <Button onClick={getPosition} type="position">
          {isLoadingPosition ? 'Loading...' : 'Use your position'}
        </Button>
      )}
    </div>
  );
}

function ChangeCenter({ center }) {
  const map = useMap();
  map.setView(center);
  return null;
}

function DetectClick() {
  const navigate = useNavigate();

  useMapEvents({
    click: (event) =>
      navigate(`form?lat=${event.latlng.lat}&lng=${event.latlng.lng}`)
  });
  return null;
}
export default Map;
