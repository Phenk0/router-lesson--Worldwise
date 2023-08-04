import styles from './Map.module.css';
import { useNavigate, useSearchParams } from 'react-router-dom';
import Button from './Button.jsx';

function Map() {
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();
  const lat = searchParams.get('lat');
  const lng = searchParams.get('lng');
  return (
    <div
      className={styles.mapContainer}
      onClick={() => {
        navigate('form');
      }}
    >
      <h1>Map</h1>
      <h2>{lat}</h2>
      <h2>{lng}</h2>
      <Button
        onClick={() => setSearchParams({ lat: '23', lng: '50' })}
        type="position"
      >
        Change pos
      </Button>
    </div>
  );
}

export default Map;
